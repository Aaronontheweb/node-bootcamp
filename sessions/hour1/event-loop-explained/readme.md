Explaining the Node.JS Event Loop
--------

Node is an asynchronous distributed programming platform built on top of [Chrome’s V8 JavaScript engine](http://code.google.com/p/v8/), the same engine used to parse and execute client-side JavaScript inside Chrome. Node is actually server-side JavaScript, but its syntax and prose are familiar to every web developer to some extent.

While many developers are excited at the prospect of server-side JavaScript, Node’s true innovation is its evented + asynchronous I/O model.

	'''JavaScript
	var http = require('http'); 
	http.createServer(function (req, res) { 
	    res.writeHead(200, {'Content-Type': 'text/plain'}); 
	    res.end('Hello World!'); 
	}).listen(1337, "127.0.0.1");
	'''

The primary method of any Node application runs a single-threaded continuous event loop - the *.listen* method of the HTTP server in this instance. This loop listens for events raised by the operating system whenever a HTTP request is received on the specified port, 1337 in this instance, and the event loop immediately hands the event off for processing to a request handler funciton which executes on a [green thread](http://en.wikipedia.org/wiki/Green_threads). 

![The Node Event Loop](http://www.aaronstannard.com/image.axd?picture=nodejs%20for%20dotnet.png "The Node Event Loop")

Once this hand-off is complete, the event loop goes back to sleep until it's either called back by the worker function once the response to the HTTP request is finished or a new HTTP event is raised by the operating system. 

Any additional I/O (reads / writes to a remote database or local filesystem, etc..) performed by the Node application is non-blocking; a new function is passed to a green thread which will callback the calling thread when the I/O operation is complete.

#### Advantages to the Node Event Model

There are three major advantages to this model:

* The main event loop uses a single thread and small allocation of memory on the heap to handle multiple concurrent connections, which makes the overhead of Node.JS grow relatively slowly as the number of requests it has to serve increases as there’s no operating system thread / process per-request initialization and context-switching overhead;

* All long-running tasks (network I/O, data access, etc…) are always executed asynchronously on top of worker threads which return the results via callback to the event loop thread, which forces most Node applications to confirm to solid asynchronous development practices by default; and

* JavaScript’s language features (functions as objects, closures, etc…) and Node’s programming model make this type of asynchronous / concurrent programming much easier to utilize – there’s no thread management, no synchronization mechanisms, and no message-passing nonsense. This eliminates a lot of pitfalls that most developers fall into when attempting to develop concurrent applications.