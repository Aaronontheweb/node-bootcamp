How To Use This Example
--------

This particular example serves plain text back in response to an HTTP request
connection on port **3000** and simply returns an integer representing the current time via
UNIX timestamp.

To use this example, start the application:

    c:\introtonode\user-defined-modules> node server.js
    c:\introtonode\user-defined-modules> starting server...

To test your application, simply visit http://127.0.0.1:3000 in your web browser or use curl if you have it:

    $ curl http://127.0.0.1:3000
    $ 1327794195