Responding to HTTP Requests
===========================

In the previous lesson we briefly introduced HTTP servers and left off with a
tantalizingly hobbled example:

```javascript
var http = require('http');
var server = http.createServer();
server.listen(process.env.PORT || 80, "0.0.0.0");
```

This server is primed for a career in therapy: it listens well, but it doesn't
respond to our requests. So let's give it better ears and a voice: the request
callback and response object.

```javascript
var http = require('http');

function requestCallback(req, res) {
    
}

var server = http.createServer(requestCallback);
server.listen(process.env.PORT || 80, "0.0.0.0");
```

What we've added is a function that's called every time the server receives an
HTTP request. That function is passed two parameters: `req` and `res`. As you
might suspect, `req` is an object with details about the request, while `res`
gives us methods to respond to the request. Pretty simple so far.

Let's take this a step further and respond to each request with "Hello World!"

```javascript
var http = require('http');

function requestCallback(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
}

var server = http.createServer(requestCallback);
server.listen(process.env.PORT || 80, "0.0.0.0");
```

The first line `res.writeHead` takes two arguments here. The first is the
[HTTP status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
(200 meaning "OK" e.g. "success") and the second an object
of headers about the response. In short, the headers tell the requesting browser
what kind of response to expect. In this case we are simply sending plain text.

The second line `res.write` sends data to the client.

`res.end()` signals to the server that all of the data has been sent and that
the server should consider the message complete. `res.end()` *must* be called on
each response.

Take note that this request handler is fairly "dumb" - it doesn't investigate
what types of requests the user is making. It only knows the user is accessing
the server. For example, try accessing `http://localhost:8080/sub/path/access.txt`
and you will still get back "Hello World!"

Loading files and setting the proper response headers will be the subject of 
our next lesson.