Installing and Using Modules via Node Package Manager (npm) 
--------

Thhe code in this particular example serves plain text back in response to an HTTP request
connection after using a third-party module to alter the case of the sentence we're sending back to the end-user.

This simple Node.JS application depends on the [slang](https://github.com/devongovett/slang) package being installed via [npm](http://npmjs.org/ "Node Package Manager") so we have to install it one of of two ways:

#### Installing npm Packages via npm install {package name}
To use this example, first start by installing the require npm packages, which can be done by:

    c:\introtonode\npm-packages> npm install slang

#### Installing via package.json
Or (this approach reads the list of dependencies from package.json and installs them)

    c:\introtonode\npm-pacages> npm install

Then start the application:

    c:\introtonode\npm-packages> node server.js
    c:\introtonode\npm-packages> starting server...

To test your application, simply visit http://127.0.0.1:3000 in your web browser or use curl if you have it:

    $ curl http://127.0.0.1:3000
    $ hello world!