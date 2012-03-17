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
// From 'https://github.com/mmukhin/psitsmike_example_1'
var app = require('express').createServer();
var io = require('socket.io').listen(app);

app.listen(process.env.PORT || 8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var usernames = {};

io.sockets.on('connection', function (socket) {

  socket.on('sendchat', function (data) {
    io.sockets.emit('updatechat', socket.username, data);
  });

  socket.on('adduser', function(username){
    socket.username = username;
    usernames[username] = username;
    socket.emit('updatechat', 'SERVER', 'you have connected');
    socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
    io.sockets.emit('updateusers', usernames);
  });

  socket.on('disconnect', function(){
    delete usernames[socket.username];
    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  });
});
```

You'll notice there's a lote of new things in the example above. The first of which is the use
of the "[express](http://expressjs.com/)" module. We aren't going to go into the 
details of express. While it does much more than just this, for now you can think of
express as a module that simplifies request handling. It's what allows us to handle requests
to '/' with a simple `app.get('/', ...`, it's also what allows us to send the user a file 
with one line (`res.sendfile(__dirname + '/index.html');`).

The next thing that should stand out to you is the
 `var io = require('socket.io').listen(app);` code near the top. This line is how socket.io
piggybacks onto the existing HTTP server instance, as we mentioned earlier.

By and large the syntax for socket.io is very much like natural language. 
Socket.io listens for incoming connections on our HTTP server with a specific URL request. 
Only then will it call the callback function with the `socket` parameter supplied. 
This `socket` parameter is an object with everything we need to know about the
connecting client.

From there we can send and receive messages to/from the client. `socket.emit`
sends a message (the 2nd parameter) on the namespace (1st parameter). In this
case the namespaces are 'updatechat' and 'updateusers'. 
This means the client must be listening for messages on one of those namespaces to
 receive a message. Let's see what this looks like on the client side:

```javascript
var socket = io.connect();

socket.on('updatechat', function (username, data) {
  $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
});
```

First a connection is initiated. When the socket receives a message on the 'updatechat'
namespace, it gets passed the `data` parameter. When this client receives an 'updatechat'
message, it will use jQuery to append that message into the '#conversation' DIV.

Hopefully, with this foundation you can start dreaming up ways to dispatch server-side
events to your clients: a new chat message, a new database entry, a weather
advisory, new joystick movement.

Bi-directional communication ties all the pieces together so your users are
always engaged with your server. Welcome to the new web.