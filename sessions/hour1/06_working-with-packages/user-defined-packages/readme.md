Writing and Including Your Own Modules
--------

The code in this particular example uses a _user-defined_ timestamp module to
send the current time back to the caller upon receiving an HTTP request.

This simple Node.JS application doesn't depend on any external modules, but rather it uses
the 'module.exports' command to enable the user to include their own modules inside their 'server.js' file.

#### Writing Your Own Module
The syntax for writing a module is pretty straightforward - take a look at some of the source from __helpers/timestamp.js__
pasted below:

```JavaScript
function(){
    return Math.round((new Date()).getTime() / 1000).toString(); //Returns a string
}
```


This particular example serves plain text back in response to an HTTP request
connection on port **3000** and simply returns an integer representing the current time via
UNIX timestamp.

To use this example, start the application:

    c:\introtonode\user-defined-modules> node server.js
    c:\introtonode\user-defined-modules> starting server...

To test your application, simply visit http://127.0.0.1:3000 in your web browser or use curl if you have it:

    $ curl http://127.0.0.1:3000
    $ 1327794195