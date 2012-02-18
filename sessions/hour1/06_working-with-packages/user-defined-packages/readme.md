Writing and Including Your Own Modules
--------

The code in this particular example uses a _user-defined_ timestamp module to
send the current time back to the caller upon receiving an HTTP request.

This simple Node.JS application doesn't depend on any external modules, but rather it uses
the `module.exports` command to enable the user to include their own modules inside their `server.js` file.

#### Creating your own modules
The syntax for writing a module is pretty straightforward - take a look at some of the source from __helpers/timestamp.js__
pasted below:

```JavaScript
function TimeStamp(){
    return Math.round((new Date()).getTime() / 1000).toString(); //Returns a string
}
```
When written like this, this is just a stand-alone function and we can't reference externally - we need to export
this file as a module to make it available to other parts of our application, so we're going to use the 'module.exports' to
make the contents of __helpers/timestamp.js__ available elsewhere in our app.

```JavaScript
exports.currentTime = function(){
    return Math.round((new Date()).getTime() / 1000).toString(); //Returns a string
}
```

What we've done here is told the modules system to expose a method called `currentTime` to anyone who includes the
module via the `requires` syntax. Let's show you what you need to do to actually use the module you just created.

#### Using your own modules
Here's what our code looks like for including the __helpers/timestamp.js__ in __server.js__:

```JavaScript
    var http = require("http") //Import the built-in HTTP module
      , timestamp = require("./helpers/timestamp"); //Import our user-defined timestamp module
```

What we did is pretty straightforward: `require` the timestamp module using a relative file path to
__helpers/timestamp.js__ from __server.js__ and drop the .js file extension from the end of the path
(the modules system will automatically look for .js files). 

From this point onward we can refer to all of the exposed methods of the 
module via the `timestamp.[METHOD NAME]` sytnax.

So if we called the module in our code, it would look like this:

```JavaScript
    res.writeHead(200, {'Content-Type':'text/plain'}); 
    res.end(timestamp.currentTime())
    console.log('Response written to stream [%s]', timestamp.currentTime())
```

Because we exposed the `currentTime` method explicitly via `exports.currentTime` in __helpers/timestamp.js__,
we can now call that object as `timestamp.currentTime()` in any module where we `require` the timestamp.js file.

#### What languages are modules written in?

Modules are typically written in JavaScript.  Some modules are written in C++.  

Supporting cross-platform C++ modules on both Unix and Windows is still a work in progress.

#### Running the Sample Application

This particular example serves plain text back in response to an HTTP request
connection on port specified by the host process and simply returns an integer representing the current time via
UNIX timestamp.

To use this example, start the application:

    c:\introtonode\user-defined-modules> node server.js
    c:\introtonode\user-defined-modules> starting server on port {PORT}

To test your application, simply visit http://127.0.0.1:{PORT} in your web browser or use curl if you have it:

    $ curl http://127.0.0.1:{PORT}
    $ 1327794195