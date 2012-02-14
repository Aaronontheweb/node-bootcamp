# socket.io in Windows Azure

## Introduction

The Windows Azure Platform now supports various application hosting environments including
- 	Java
- 	PHP
- 	Node.js

Java and PHP have a long history. Node.js has been available for only a few years but has rapidly become a very popular hosting environment for scalable websites. 
With the advent of HTML5, the notion of using web sockets to facilitate browser-based communication has become fashionable. The socket.io package provides a way to access web socket capability inside node.js. This document focuses on the deployment of socket.io applications to a Windows Azure hosted service.
Node.js

Node.js is a lightweight platform for building highly-scalable network applications in JavaScript. In particular, it can be used to develop and host web servers.  An essential feature of node.js is the extensive use of callbacks to enforce asynchrony on programs. Almost every action in node.js is performed by invoking functions which invoke callbacks on completion. This heavy use of non-blocking asynchronous calls is critical to providing the high scalability of node.js.

### Hello World in node.js
The following example demonstrates how easy it is to create a simple web server in node.js:

```javascript
var port = 81;
var http = require('http');

var app = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

app.listen(port);
console.log('Server running on port ' + port);
```

When the code above is saved in a file named server.js, the following command can be used to launch the web server:
Node server.js
The require() statement imports the http module into the program, where it is used to create an HTTP server. The parameter to the CreateServer() function is an anonymous callback function which is invoked each time the server receives a request. This callback function is passed the request and response objects for the request. In the example, a response header is added to the response before res.end() is invoked to add “Hello World” to the response body and flush the response to the client. The app.listen() function is invoked to have the HTTP server start listening on post 81. Finally, a status message is written to the console.
This simple program demonstrates several features common to node.js programs:
-	The use of require to import modules into the program
-	The creation of a server.
-	The use of listen() to start the listening process

Node Package Manager (NPM)
The Node Package Manager (NPM) is an application that simplifies the local installation for the thousands of packages that have been created for node.js. NPM stores downloaded packages in a node_modules folder under the invocation directory in the application. It is possible to specify that downloaded packages be stored globally but, in general, they should be regarded as part of the application they are being used in and stored locally (which is the default).
The package.json file associated with a downloaded package specifies dependencies on other packages that it may have. NPM recursively downloads these dependent packages into a node_modules directory associated with the initial package.
The azure package exports an API allowing access to the Windows Azure environment and Windows Azure Storage service.  The following command can be used to download the azure package to the local node_modules directory:

```javascript
npm install azure
```

### Application Frameworks
A web application can be coded directly in JavaScript and deployed as a website hosted in node.js. As in other web-development environments it is common to use an application framework to provide a structure to the application to enforce the separation of concerns that is helpful in developing large-scale applications.
Many node.js samples use the Express framework.  This uses routes and views directories to store application routes and views. Express supports various view engines including Jade and EJS (embedded JavaScript). These provide different ways to specify the appearance of a web page.

The following commands can be invoked to download the Express module and create a default node.js web server using the Express framework and the Jade view engine:

```javascript
npm install express
.\node_modulles\.bin\express
npm install
node app.js
```

This starts a web server, listening on port 3000, which responds with the web page defined in views\index.jade.
app.js contains the following:

```javascript
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
```

This is similar in style to the earlier Hello World example except for the need to configure the Express framework and the use of it, instead of the http module, to create the server and start the listener.

## Socket.io
socket.io is a node.js package that simplifies the creation of web applications supporting real-time communication between browsers and devices. The canonical example of a socket.io application is a chat application allowing users to chat with each other from their browsers.
Socket.io supports various transports including:
1.	websocket
2.	htmlfile
3.	xhr-polling
4.	jsonp-polling

socket.io uses the transports in that priority and automatically degrades to a lower-priority transport if a particular transport is not available for a connection. For example, web sockets are not supported in Internet Explorer 9 so socket.io uses htmlfile or xhr-polling as the transport with IE9 clients. The available transports can be restricted through configuration.
An application using socket.io comprises both a server and a client. Since socket.io is a node.js package it conforms to the event-driven model of node.js. Consequently, both server and client use the same events.
Socket.io implements thenode.js EventEmitter interface:
-	emitter.addListener(event, listener)
-	emitter.on(event, listener)
-	emitter.once(event, listener)
-	emitter.removeListener(event, listener)
-	emitter.removeAllListeners([event])
-	emitter.setMaxListeners(n)
-	emitter.listeners(event)
-	emitter.emit(event, [arg1], [arg2], [...])
-	Event: 'newListener'

This interface supports the association of named events (or messages) with callbacks. Specifically, emitter.emit() sends a named event while emitter.on() receives a named event by associating a callback with it. A socket.io app is created by the mutual exchange of named events between the client and the server.
The core sockets object manages connections. It handles a connection event by creating a socket object and passing that to the callback associated with the connection event. The socket object handles individual connections and listens for the disconnect event.  It also supports named events that contain the conversation messages providing the application functionality.

Hello World in socket.io
The following sample from the socket.io documentation shows a very simple implementation of a server:

```javascript
var io = require('socket.io').listen(80);
io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
});
```

socket.io automatically starts the underlying node.js server to listen on port 80 (in the example). The server then uses io.sockets.on() to associate a connection event with the anonymous callback that emits a news event with the JSon-formatted message back to the connecting client. It then adds an event listener on the event named my other event to the socket used for this connection.

The associated client code is:

```javascript
<script src="/socket.io/socket.io.js"></script>
<script>
	var socket = io.connect('http://localhost');
	socket.on('news', function (data) {
	    console.log(data);
	    socket.emit('my other event', { my: 'data' });
	});
</script>
```

This imports the socket.io client code and then uses it to initiate a connection with the server. It then associates an event named news with the connection socket. This event logs the connection and then emits an event back to the server. The client code would normally be associated with HTML to provide a user interface.
Data Storage
socket.io supports the local storage of data for the duration of a session. The set() and get() methods on a socket can be used to manage name/value pairs in this store. The chat example that ships with socket.io uses this store to maintain the names of the chat participants as follows:

```javascript
var io = require('socket.io').listen(80);
io.sockets.on('connection', function (socket) {
  socket.on('set nickname', function (name) {
	  socket.set('nickname', name, function () {
		socket.emit('ready');
		});
		});
		socket.on('msg', function () {
			socket.get('nickname', function (err, name) {
			console.log('Chat message by ', name);
		});
	});
});
```

### Additional Emit Features
socket.io provides some flags that provide additional control over the emitted messages.
The volatile flag indicates that a message can be dropped without causing problems on the sender. This modifies the standard emit as follows:
socket.volatile.emit('some less important event', 'who cares' );
The broadcast flag indicates that a message must be sent to all other participants in the conversation. This modifies the standard emit as follows:
socket.broadcast.emit('hello');
socket.io in Windows Azure

The Windows Azure SDK for node.js provides a set of PowerShell cmdlets that can be used to manage application creation and deployment either to the development environment or as a Windows Azure hosted service. These include:
-	New-AzureService serviceName
-	Add-AzureNodeWorkerRole
-	Start-AzureEmulator –launch
-	Stop-AzureEmulator

A socket.io application can be deployed to a Windows Azure hosted service in the same way as any other node.js application. Since IIS does not support web sockets a socket.io application deployed to a web role cannot use web sockets as a transport and another transport must be used. Socket.io applications hosted in a worker role are not affected by this limitation. For example, a socket.io application can be configured to use only the xhr-polling transport as follows:

```javascript
io.configure(function() {
io.set('transports', ['xhr-polling']);
io.set('polling duration', 10);
});
```

Node.js and socket.io applications can be deployed almost without change to Windows Azure. The node.js (or socket.io) application must be in a file named server.js in the root directory of the role.  The listening port must be set to process.env.port to ensure the correct port is used. The Windows Azure hosting environment for node.js ensures that this value is set to the correct value for the environment.
A socket.io application is typically migrated to Windows Azure as follows:
1.	Invoke the New-AzureService PowerShell cmdlet to create the service model for the Windows Azure service.
2.	Invoke the Add-AzureNodeWorkerRole PowerShell cmdlet to add a worker role to the service. There is a similar cmdlet to add a web role.
3.	Add the socket.io application to the role root directory (e.g. WorkerRole1) and invoke the Node Package Manager ensure that any required packages are downloaded correctly.
4.	Change the port number the socket.io application listens on to process.env.port to ensure that the correct port is used in either the development or hosted Windows Azure environments.
5.	Invoke the Start-AzureEmulator powerShell cmdlet to launch the socket.io application in the development environment.
6.	Invoke the Stop-AzureEmulator PowerShell cmdlet to shut down the development environment.

### Socket.io Chat Sample in Windows Azure
The Windows Azure portal has a nice demonstration of how easy it is to migrate the chat sample on the socket.io github repository to be migrated to Windows Azure. This requires only two lines of code to be changed.
References
-	Windows Azure SDK for node.js:
http://www.windowsazure.com/en-us/develop/nodejs/
-	Node.js website:
http://nodejs.org/
-	socket.io website
http://socket.io/
-	github repository for socket.io
https://github.com/LearnBoost/Socket.IO	
-	Express Framework for node.js
http://expressjs.com/
-	Jade template engine
http://jade-lang.com/
-	github repository for EJS template engine
https://github.com/visionmedia/ejs



