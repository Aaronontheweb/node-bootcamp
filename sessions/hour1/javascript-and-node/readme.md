"Javascript and Node"
=====================

A very brief history of JavaScript:
-----------------------------------

* Originally developed by Brendan Eich at Netscape Communications Corporation for the Netscape Navigator web browser in 1995
* Mostly used for interactive webpages until AJAX starts getting big in 2000
  * (AJAX enters the public eye in 2005 when Jesse James Garrett publishes "Ajax: A New Approach to Web Applications")
* In in 2008, Google releases Chrome, praised for JS performance starting an arms race with other browsers.
  * Members of the arms race: Webkit(Safari): Squirrelfish, Mozilla: TraceMonkey, Google: V8, IE: Chakra 
* So, starting in 2008, JavaScript starts to see really good performance.

How does this relate to Node?
-----------------------------
* V8 can be de-coupled from Chrome
* Node is V8, running on a server, with lots of extra code to enable "server side" javascript
* Examples of code that Node adds to JavaScript:
  * net ("an asynchronous network wrapper")
  * Buffer (for dealing with binary data)
  * http (for creating an HTTP server or client)
  * os (for getting information about the host)


See also:
=========

* http://en.wikipedia.org/wiki/JavaScript
* http://en.wikipedia.org/wiki/JavaScript_engine
* http://nodejs.org/docs/latest/api/all.html
* https://github.com/joyent/node/tree/master/lib