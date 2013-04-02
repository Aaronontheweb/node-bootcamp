"Javascript and Node"
=====================

A very brief history of JavaScript:
-----------------------------------

JavaScript was originally developed by Brendan Eich at Netscape for Netscape Navigator in 1995.
Initially, most people used JavaScript for trivial things: button mouse-overs, pop-ups, menus, etc.
During this period of time, many people dismissed JavaScript as a "toy" language.

Starting in about 2000, people started to use JavaScript to load additional data onto a webpage, 
a technique which Jesse James Garrett named "Ajax" in 2005. 
It's around this time that people start to take JavaScript more seriously.

Then, in 2008, Google releases their Chrome web browser, which is praised for its impressive JavaScript performance. 
This is the start of a sort of "arms race" between the major browsers to improve the performace of JavaScript. 
Chrome gets the V8 JavaScript Engine, Webkit gets Squirrelfish, Firefox gets TraceMonkey, Internet Explorer gets Chakra, and so on.


Okay, why do I care?
--------------------

It's important to know that these days, JavaScript is a powerful and performant language that people use to power large websites.
Since this hasn't always been the case, expect to encounter people who have misgivings about JavaScript based on poor experices they may have had with JavaScript many years ago.

Knowing this little bit of history will also help you understand what V8, namely, Chrome's JavaScript engine. V8 is also the code that powers the core of Node.

What is Node?
-------------

Given what you've learned so far, this definion should make sense: 
Node is the V8 JavaScript engine, running on a server with lots of extra code to enable server side JavaScript.

If you're wondering what we mean by "extra code to enable server side JavaScript", 
here are some examples of code that Node adds to JavaScript:
* The "net" module, "an asynchronous network wrapper".
* The "Buffer" module which is for dealing with binary data.
* The "http" module whis is for creating an HTTP server or client.
* The "os" module which is for getting information about the host.


See also:
=========

* http://en.wikipedia.org/wiki/JavaScript
* http://en.wikipedia.org/wiki/JavaScript_engine
* http://nodejs.org/docs/latest/api/all.html
* https://github.com/joyent/node/tree/master/lib