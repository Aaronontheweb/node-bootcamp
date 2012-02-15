Working with the Filesystem
===========================

In the previous lesson we built out a simple HTTP server that takes requests and
sends back a simple "Hello World!" string:

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

In this lesson we will do a bit more investigation of the request object, Node's
[filesystem module](http://nodemanual.org/latest/nodejs_ref_guide/fs.html)
and combine the two to send requested files back to the user. Let's start with
the filesystem module.

### The Filesystem Module

There are few points in Node.JS where the asynchronous programming model so
starkly contrasts with convention than with the filesystem module. Why? In most
programming languages, file access means synchronously waiting for the OS to
retrieve the file from disk. In PHP for example if the file read is ongoing
while another visitor requests access to the server, that user must wait for the
read operation to complete.

Node.JS allows for reading files asynchronously, while other visitors continue
to access the server without delay.

Consider this simple example, stripped first of HTTP components:

```javascript
var fs = require("fs");

fs.readFile("/etc/hosts", "utf-8", function(err, data) {
    if (err)
        throw err;
    console.log(data);
});

console.log("FIRST!111!!");
```

Let's break this down. First, the filesystem module is loaded with
`var fs = require("fs")`, giving us access to its methods via the `fs` variable.
Next we call the `readFile` method with 3 parameters: the file location, encoding,
and finally a callback function. The 2nd parameter - encoding - is optional; if
it is omitted then the raw buffer data is returned.

When the file has completely loaded, the 3rd parameter - the callback - is called
with two required parameters: `err` (set to null or undefined if no error occurs)
and the `data` from the file.

Take note of the very last line in this example: `console.log("FIRST!111!!");`.
If you run this code then "FIRST!111!!" will appear _before_ the contents of the
file are spit out. More than demonstrating our fantastic wit with trolling humor,
this drives home our point about the asynchronous model; the event loop continues
on while Node.JS loads up your file.

### Sending a Requested File

Let's build on our HTTP and file knowledge to send requested files back to
visitors.

```javascript
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile(__dirname + req.url, 'utf-8', function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('File ' + req.url + ' not found\n');
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(data);
        }
    });
}).listen(process.env.PORT || 80, "0.0.0.0");
```

You can find this code in `server.js` along with this readme.md file. If you
run `server.js` and request "http://[host]/readme.md" the contents of this file
will be returned.

How does this work? The magic is in `fs.readFile(__dirname + req.url`

1. `__dirname` is globally available and set to the directory that the currently
executing script resides in

2. `req.url` is set to the path of the URL the user is requesting. If for example
we requested 'http://host/readme.md' then req.url is "/readme.md". If the URL
is only the domain (e.g. "http://nodejs.org") then req.url is "/"

This code won't work very well if you are requesting non-plaintext files such
as images. In a production file serving environment you would want to set the
mime type through a module like [node-mime](https://github.com/bentomas/node-mime).

### Caching Files

While reading files asynchronously is of great benefit to your users, you will
likely want to take advantage of a simple caching method so the code isn't
constantly slamming your disk for the same hilarious cat images.

```javascript
var http = require('http');
var fs = require('fs');

var loadedFiles = {};

function returnData(res, code, data) {
    res.writeHead(code, {'Content-Type': 'text/plain'});
    res.end(data);
}

http.createServer(function (req, res) {
    if (loadedFiles[req.url])
        returnData(res, 200, "Cached: " + loadedFiles[req.url]);

    fs.readFile(__dirname + req.url, 'utf-8', function(err, data) {
        if (err) {
            returnData(res, 404, 'File ' + req.url + ' not found\n');
        }
        else {
            loadedFiles[req.url] = data;
            returnData(res, 200, data);
        }
    });
}).listen(process.env.PORT || 80, "0.0.0.0");
```

If the file has been found, it is cached in the loadedFiles object and referenced
by the requested path. We have meanwhile abided by the
[DRY principle](http://en.wikipedia.org/wiki/Don't_repeat_yourself) by
consolidating functionality in the `returnData` method.

_Note: This is only intended to demonstrate a useful concept and is not intended
to be a good example of caching. A more sophisticated example will check for
file updates, amongst other advanced caching ops._

In the next lesson we will expand on our knowledge of requests and start to
build a real-world application your visitors can engage with.