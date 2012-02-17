Bi-Directional Communication with Socket.io
===========================================

In the last lesson we hammered on the point that Node.JS enables concurrency in
your application.

One of the most awesome utilities to take advantage of concurrency is socket.io.
Before we get into what socket.io is and how to use it, a brief history on how
users and websites have traditionally interacted.

### A Brief History

Up until a few years ago, the web was primarily concerned with one metric:
getting webpages to visitors as quickly as possible.

User sends request -> Server
Server sends data back -> Client
Connection terminated.

Note, however, that this does not allow the server to send data back to the
client as updates on the server occur. For many websites, this is still the
model; you have to refresh the page to see updates.

### Today

Nowadays, the metric is centered on providing a more engaging user experience.
One of the most powerful realizations of this potential is on Facebook: the news
ticker, notifications and chat are pillars of the experience and it works to
keep users engaged.

The technological approach Facebook uses to drive this experience is
bi-directional communication. What is bi-directional communication? It means
on top of the established client-request/server-respond model, the server can
send messages to the client without the client specifically requesting them.

### The Socket.io Way

The way socket.io works is its server component "tricks" the client into staying
connected to the server until the connection times out. When that connection
times out, the client connects again. And again, on and on - forever. Why? When
the server has something meaningful to say to the client - for example, that a
new chat message has come in - the server sends a message to the client and
closes out the connection. Then the client connects again, and the process
continues. In this way the client is always "primed" to receive messages from
the server.

Socket.io wasn't the first to pioneer this technique, but it has become the de
facto standard for bi-directional communication in Node.JS apps.

Of course, this description has cut a lot of corners for brevity, but you can
learn more about socket.io's approach and internals at [LearnBoost's socket.io
page on GitHub](https://github.com/LearnBoost/socket.io).

### Implementing Socket.io

To use socket.io in your node project, run `npm install socket.io` inside the
project directory. On Cloud9, this can be accomplished from the CLI at the
bottom of the IDE. From there, getting socket.io in your code is as simple as

```javascript
var socketio = require('socket.io');
```

Socket.io works by piggybacking onto your existing HTTP server instance to
listen for incoming connections and messages from clients.

```javascript
var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');

var app = http.createServer(requestCallback);
var io = socketio.listen(app);

app.listen(process.env.PORT || 80);

function requestCallback(req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(404);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
```

The code here should look familiar except in a couple spots: `var io = 
socketio.listen(app);` and the `io.sockets.on` code at the bottom. The
`socketio.listen(app)` is how socket.io piggybacks onto your existing HTTP server
instance, as we mentioned earlier.

By and large the syntax is very much like natural laguage. Socket.io listens for
incoming connections on our HTTP server with a specific URL request. Only then
will it call the callback function with the `socket` parameter supplied. This
`socket` parameter is an object with everything we need to know about the
connecting client.

From there we can send and receive messages to/from the client. `socket.emit`
sends a message (the 2nd parameter) on the namespace (1st parameter). In this
case the namespace is 'news'. This means the client must be listening for
messages on the 'news' namespace to receive the message. Let's see what this
looks like on the client side:

```javascript
var socket = io.connect();
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});
```

First a connection is initiated. When the socket receives a message on the 'news'
namespace, it gets passed the `data` parameter.

Let's say we want to create a simple chat application; every time we receive
a message, we send the message to all clients. To achieve this, we'll create a
'chat' namespace and restrict messages to just that namespace.

```javascript
var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');

var app = http.createServer(requestCallback);
var io = socketio.listen(app);

app.listen(process.env.PORT || 80);

function requestCallback(req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(404);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

var chat = io.of('/chat').on('connection', function (socket) {
    socket.emit('a message', {
        to: 'the connecting user'
    });
    chat.emit('a message', {
        to: 'everyone'
    });
});
```

The client connects to the 'chat' namespace like so:

'''javascript
var chat = io.connect('/chat');

chat.on('connect', function () {
    chat.emit('hi!');
});

chat.on('a message', function(data) {
    console.log(data);
});
```

With this foundation you can start dreaming up ways to dispatch server-side
events to your clients: a new chat message, a new database entry, a weather
advisory, new joystick movement.

Bi-directional communication ties all the pieces together so your users are
always engaged with your server. Welcome to the new web.