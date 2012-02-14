# Getting Started with socket.io

Socket.IO: http://socket.io
Installing Socket.IO using npm: npm install socket.io

## What is Socket.io
[From http://socket.io] Socket.IO aims to make realtime apps possible in every browser and mobile device, blurring the differences between the different transport mechanisms. It's care-free realtime 100% in JavaScript.


Socket.IO aims to bring a WebSocket-like API to many browsers and devices, with some specific features to help with the creation of real-world realtime applications and games.
- Multiple transport support (old user agents, mobile browsers, etc).
- Multiple sockets under the same connection (namespaces).
- Disconnection detection through heartbeats.
- Optional acknoledgments.
- Reconnection support with buffering (ideal for mobile devices or bad networks)
- Lightweight protocol that sits on top of HTTP.

## How do Socket.io sockets work?

1. A Socket.IO client first decides on a transport to utilize to connect. 

2. The state of the Socket.IO socket can be disconnected, disconnecting, connected and connecting.

3. The transport connection can be closed, closing, open, and opening.

4. A simple HTTP handshake takes place at the beginning of a Socket.IO connection. The handshake, if successful, results in the client receiving:
	a. session id that will be given for the transport to open connections.
	b. number of seconds within which a heartbeat is expected (heartbeat timeout)
	c. number of seconds after the transport connection is closed when the socket is considered disconnected if the transport connection is not reopened (close timeout).
 
5. At this point the socket is considered connected, and the transport is signaled to open the connection.

6. If the transport connection is closed, both ends are to buffer messages and then frame them appropriately for them to be sent as a batch when the connection resumes.

7. If the connection is not resumed within the negotiated timeout the socket is considered disconnected. At this point the client might decide to reconnect the socket, which implies a new handshake.


## Socket.io HTTP Requests

Socket.IO HTTP URIs take the form of:

```
[scheme] '://' [host] '/' [namespace] '/' [protocol version] '/' [transport id] '/' [session id] '/' ( '?' [query] )
```

Only the methods GET and POST are utilized (for the sake of compatibility with old user agents), and their usage varies according to each transport.

The main transport connection is always a GET request.

```
1. URI scheme

   The URI scheme is decided based on whether the client requires a secure connection or not. Defaults to http, but https is the recommended one.

2. URI host

   The host where the Socket.IO server is located. In the browser environment, it defaults to the host that runs the page where the client is loaded (location.host)

3. Namespace

   The connecting client has to provide the namespace where the Socket.IO requests are intercepted.This defaults to socket.io for all client and server distributions.

4. Protocol version

   Each client should ship with the revision ID it supports, available as a public interface to developers.

	For example, the browser client supports io.protocolVersion.

5. Transport ID

   The following transports are supported:
 	- xhr-polling
 	- xhr-multipart
 	- htmlfile
 	- websocket
 	- flashsocket
 	- jsonp-polling
 
   The client first figures out what transport to use. Usually this occurs in the browser, utilizing feature detection. User-defined transports are allowed
```

## Socket.io Handshakes

The client will perform an initial HTTP POST request like the following
http://example.com/socket.io/1/

The absence of the tranport id and session id segments will signal the server this is a new, non-handshaken connection.

The server can respond in three different ways:

``` 
 1. 401 Unauthorized
 
	If the server refuses to authorize the client to connect, based on the supplied information (eg: Cookie header or custom query components). No response body is required.
 
 2. 503 Service Unavailable
 
	If the server refuses the connection for any reason (eg: overload). No response body is required.
 
 3. 200 OK
 
	The handshake was successful.

```

The body of the response should contain the session id (sid) given to the client, followed by the heartbeat timeout, the connection closing timeout, and the list of supported transports separated by :

The absence of a heartbeat timeout ('') is interpreted as the server and client not expecting heartbeats.

For example 4d4f185e96a7b:15:10:websocket,xhr-polling


## Socket.io Connections

Once the handshake request-response cycle is complete (and it ended with success), a new connection is opened by the transport that was negotiated, with a GET HTTP request.

The transport can modify the URI if the transport requires it, as long as no information is lost. For example, if websocket is accepted as the transport, and the connection was secure, the URI for the transport connection will become:
wss://example.com/socket.io/1/websocket/4d4f185e96a7b

The URI still contains all the information required by Socket.IO to continue the message exchange (protocol security, namespace, protocol version, transport, etc).

Messages can be sent and received by following this convention. How the messages are encoded and framed depends on each transport, but generally boils down to whether the transport has built-in framing (unidiretionally and/or bidirectionally).

## Unidirectional transports

Transports that initialize unidirectional connections (where the server can write to the client but not vice-versa), should perform POST requests to send data back to the server to the same endpoint URI.

## Socket.io Messages

### Framing

Certain transports, like websocket or flashsocket, have built-in lightweight framing mechanisms for sending and receiving messages.

For xhr-multipart, the built-in MIME framing is used for the sake of consistency.

When no built-in lightweight framing is available, and multiple messages need to be delivered (i.e: buffered messages), the following is used:
`\ufffd` [message lenth] `\ufffd`

 Transports where the framing overhead is expensive (ie: when the xhr-polling transport tries to send data to the server).

### Encoding

Messages have to be encoded before they're sent. The structure of a message is as follows:
[message type] ':' [message id ('+')] ':' [message endpoint] (':' [message data]) 

 The message type is a single digit integer.

The message id is an incremental integer, required for ACKs (can be ommitted). If the message id is followed by a +, the ACK is not handled by socket.io, but by the user instead.

Socket.IO has built-in support for multiple channels of communication (which we call "multiple sockets"). Each socket is identified by an endpoint (can be omitted).

### Disconnect

Signals disconnection. If no endpoint is specified, disconnects the entire socket.

Examples:
 
Disconnect a socket connected to the /test endpoint.

```javascript
0::/test
```

Disconnect the whole socket

```javascript
0
``` 

Connect

Only used for multiple sockets. Signals a connection to the endpoint. Once the server receives it, it's echoed back to the client.

Example, if the client is trying to connect to the endpoint /test, a message like this will be delivered:

```javascript
'1::' [path] [query]
```

 Example:

```javascript
1::/test?my=param
```

An event is like a json message, but has mandatory name and args fields. name is a string and args an array.

The event names
'message'
'connect'
'disconnect'
'open'
'close'
'error'
'retry'
'reconnect'

are reserved, and cannot be used by clients or servers with this message type.

While closing the transport connection is enough to trigger a disconnection, it sometimes is desireable to make sure no timeouts are activated and the disconnection events fire immediately.
http://example.com/socket.io/1/xhr-polling/812738127387123?disconnect

The server must respond with 200 OK, or 500 if a problem is detected.

## Sample Socket.io Chat Client/Server using Express

To begin, you must ensure that both Express and Socket.io modules are installed

``` javascript
npm install express socket.io
```

Create the Server file App.js


```javascript
var app = require('express').createServer()
var io = require('socket.io').listen(app);

app.listen(8080);

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// usernames which are currently connected to the chat
var usernames = {};

io.sockets.on('connection', function (socket) {

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.emit('updatechat', socket.username, data);
	});

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		// we store the username in the socket session for this client
		socket.username = username;
		// add the client's username to the global list
		usernames[username] = username;
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'you have connected');
		// echo globally (all clients) that a person has connected
		socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
		// update the list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	});
});
```

Create the client file, Index.html

```javascript
<script src="/socket.io/socket.io.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
<script>
	var socket = io.connect('http://localhost:8080');

	// on connection to server, ask for user's name with an anonymous callback
	socket.on('connect', function(){
		// call the server-side function 'adduser' and send one parameter (value of prompt)
		socket.emit('adduser', prompt("What's your name?"));
	});

	// listener, whenever the server emits 'updatechat', this updates the chat body
	socket.on('updatechat', function (username, data) {
		$('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
	});

	// listener, whenever the server emits 'updateusers', this updates the username list
	socket.on('updateusers', function(data) {
		$('#users').empty();
		$.each(data, function(key, value) {
			$('#users').append('<div>' + key + '</div>');
		});
	});

	// on load of page
	$(function(){
		// when the client clicks SEND
		$('#datasend').click( function() {
			var message = $('#data').val();
			$('#data').val('');
			// tell server to execute 'sendchat' and send along one parameter
			socket.emit('sendchat', message);
		});

		// when the client hits ENTER on their keyboard
		$('#data').keypress(function(e) {
			if(e.which == 13) {
				$(this).blur();
				$('#datasend').focus().click();
			}
		});
	});

</script>
<div style="float:left;width:100px;border-right:1px solid black;height:300px;padding:10px;overflow:scroll-y;">
	<b>USERS</b>
	<div id="users"></div>
</div>
<div style="float:left;width:300px;height:250px;overflow:scroll-y;padding:10px;">
	<div id="conversation"></div>
	<input id="data" style="width:200px;" />
	<input type="button" id="datasend" value="send" />
</div>
```

Run the server:

```javascript
node app.js
```

Load up the client:

```javascript
http://localhost:8080
```
