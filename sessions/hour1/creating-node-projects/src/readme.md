How To Use This Example
--------

This particular example serves plain text back in response to an HTTP request
connection on a port specified by the process or port 3000 and simply responds "Hello World!" back to the end-user.

To use this example, start the application:

    c:\introtonode\helloworld-http> node server.js
    c:\introtonode\helloworld-http> starting server...

To test your application, simply visit http://127.0.0.1:{PORT || 3000} in your web browser or use curl if you have it:

    $ curl http://127.0.0.1:3000
    $ Hello World!