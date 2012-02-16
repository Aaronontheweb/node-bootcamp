What Is Node and How Does It Work?
--------

Simply explained, Node.JS is a JavaScript-powered framework for building network applications like web apps, chat servers, real-time games, and so forth.

There are three aspects to Node that make it really interesting to developers of all levels of experience:

1. JavaScript has a long history of mainstream adoption on the client-side of web development, but Node offers a path for developers with JavaScript experience to carry those skills over to server-side development. 

2. Node's evented model for handling incoming HTTP requests offers an interesting alternative to the traditional thread-per-request models that most web developers have grown accustomed to, and it offers some sizeable performance advantages particularly in scenarios where applications have to service a large volume of concurrent requests.

3. Node's non-blocking approach to I/O, which uses common JavaScript idioms like events and callbacks, gives Node one of the most simple, elegant, and effective methodologies for encouring good asynchronous programming habits. Node's taken a lot of nasty problems that used to go into concurrent programming and left developers with a relatively straight-forward model for leveraging the power of concurrent programming.


#### How Does Node Work?

We will cover the details of how the Node event loop works a later in this session, but here's the gist of it:

* Node runs in a system process and listens for HTTP requests on a port specified by the developer;
* Whenever a HTTP request is received the OS wakes up the Node application's event-loop thread, which decides what to do with the request;
* Any subsequent I/O performed in the process of handling the request, like connecting to a database server or reading a file from disk, is done asynchronously on a worker thread; and
* When the work is finished, the worker calls back the main event loop thread, which returns a completed response object to the original request.

#### What Powers Node?

Node can be broken down into three core technologies:

* The foundation of Node is [Chrome's JavaScript runtime](http://code.google.com/p/v8/), known as the "V8 Engine." V8 is the same engine used by Chrome to execute JavaScript on any page you visit while browsing, and it's what allows Node developers to use JavaScript at all in the first place.

* The next major component of Node is the [CommonJS](http://www.commonjs.org/) module system - it's a standard which allows developers to define modules that can be reused and shared throughout their own applications and others. Without CommonJS' standards we wouldn't have systems like [npm](http://www.npmjs.org/) (Node Package Manager) which allow Node developers to share reusable packages with eachother and provide a standard for handling dependencies in our Node applications.

* The final major component of Node is a powerful network I/O library developed by [Joyent](http://www.joyent.com/) called [libuv](https://github.com/joyent/libuv) - this is what handles all of the incoming network connections on both Windows and POSIX-based systems like Linux and OS X.
