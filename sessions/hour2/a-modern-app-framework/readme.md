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
They already know how to route requests to subdomains. In fact, if all your
application is doing is reading from a database and sending that information
back to the client, then PHP is still a better choice than Node.JS.

So what has all this discussion been leading up to? Why is everyone so excited
about Node.JS?

### The Modern Web

To demonstrate why Node.JS is becoming the platform of choice for modern web
applications, let's take an example application and explain why Node.JS was the
best choice for building its back-end.

First, some requirements for the app:

* Enables bi-directional communication between user and server
* Integrates with a number of external services
* Concurrently manages thousands of requests from thousands of users
* Requests cannot block other users' requests

Many modern applications fit this bill, but one of the most powerful examples is
Cloud9 IDE.

A typical workflow on Cloud9 goes like this:

1. User logs in via their GitHub credentials
2. User clicks on a Node.JS project (let's say [node_chat](https://github.com/ajaxorg/node_chat))
and clicks "Import"
3. The server spins up a child process to `git clone` the external GH URL
4. When Step #3 is complete, the user is notified immediately and the user opens
the project
5. The IDE loads, the user opens server.js and hits "Run"
6. A node process is spun up; when that startup is complete, the user is notified
immediately in the Cloud9 console with the project URL
7. The user clicks on the URL and views the chat app interface
8. As the user is testing the realtime chat app, `console.log` outputs from the
process are being sent back to the IDE's console _as they happen_

Meanwhile, **thousands of other users are going through the same flow** and no
one is slowed down or blocked by anyone else. How is this possible?

### Node Enables Concurrency

The magical concept, the theme we have been hammering on is
_Node.JS enables concurrency_.

We have already been demonstrating this through discussions on the event loop
and examples of callbacks. And as you continue to learn about Node you will see
this concept demonstrated over and over again. Retrieving tabular data from MySQL
is non-blocking, sending a request to GitHub is non-blocking. Bi-directional
communication is non-blocking and furthermore, enabled by a fantastic library
called socket.io.

And that is where we will continue with our next lesson.