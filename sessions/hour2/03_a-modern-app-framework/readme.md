A Modern Application Framework
==============================

At this point in the lesson plan, it is essential to take what you've learned
thus far and apply a bit of conceptual thinking to modern web development.
First, let's recap.

In the previous lessons we discussed the Node programming model; the event loop;
JavaScript in general; Node modules; loading files; and serving requests through a
dead-simple HTTP server implementation.

This last discussion was useful to demonstrate the ease of implementing HTTP servers
in Node. But let's be honest: HTTP servers are nothing new. Many web developers
are intimately familiar with the LAMP stack. They already know how to serve files.
They already know how to route requests to subdomains. In fact, if the _only 
thing_ your application does is read from a database and send that information
back to the client, then PHP may still a better choice than Node.JS.

So what has all this discussion been leading up to? Why is everyone so excited
about Node.JS?

### The Modern Web

To demonstrate why Node.JS is becoming the platform of choice for modern web
applications, let's take an example application and explain why Node.JS was the
best choice for building its back-end.

First, some requirements for the app:

* Enables bi-directional communication between user and server
* Integrates with a number of external services & processes
* Maintains state
* Concurrently manages thousands of requests from thousands of users
* Requests cannot block other users' requests

Many modern applications fit this bill, but one of the most powerful examples is
[Cloud9 IDE](http://c9.io).

Some common operations a user engages in on Cloud9:

* Cloning a project from GitHub: A child process starts to `git clone` and the
user is notified immediately after it's finished (external service, bi-directional
comm.)
* Running a Node.JS project from the IDE (external process)
* As the user is testing the running process, `console.log` outputs from the
process are being sent back to the IDE's console as they happen (bi-directional
comm.)
* Deploying an application to Azure (external service)
* User closes IDE, opens it an hour later and everything is where it left off
(maintaining state)

Meanwhile, _thousands of other users are making requests on the server_ and no
one is slowed down or blocked by anyone else. How is this possible?

### Node Enables Concurrency

The magical concept, the theme we have been hammering on is
_Node.JS enables concurrency_.

We have already been demonstrating this through discussions on the event loop
and examples of callbacks. And as you continue to learn about Node you will see
this concept demonstrated over and over again.

The level of concurrent engagement a modern application demands are enabled by
Node.JS: retrieving tabular data from MySQL is non-blocking; sending a request
to GitHub is non-blocking; deploying to Azure is non-blocking; bi-directional
communication is non-blocking and furthermore, enabled by a fantastic library
called socket.io.

And that is where we will continue with our next lesson.