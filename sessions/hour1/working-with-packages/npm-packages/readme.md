Installing and Using Modules via Node Package Manager (npm) 
--------

Thhe code in this particular example serves plain text back in response to an HTTP request
connection after using a third-party module to alter the case of the sentence we're sending back to the end-user.

This simple Node.JS application depends on the [slang](https://github.com/devongovett/slang) package, so we have to install it via [npm](http://npmjs.org/ "Node Package Manager").

#### Installing npm Packages via npm install {package name}
npm is the central package repository for Node.JS. As of writing this NPM has just under 7,000 packages that are free for you to include in your Node applications as you see fit.

The npm utility is installed by default whenever you [install the Node.JS runtime](http://nodejs.org/) on any system.

To install a package manually, all you need to do is use the _npm install_ command followed by the package name, like so:

    c:\introtonode\npm-packages> npm install slang

This will automatically install the slang binaries in a @node_modules@ subdirector of your current working folder:

	c:\introtonode\npm-packages
	c:\introtonode\npm-packages\server.js
	c:\introtonode\npm-packages\node_modules\
	c:\introtonode\npm-packages\node_modules\slang\
	c:\introtonode\npm-packages\node_modules\slang\... {stuff}

Now you can include the slang module anywhere in your current Node application, like this:

	var slang = require("slang")

Node's module system knows to always search in your project's @node_modules@ directory when looking for modules to include, so you never need to worry about relative paths and such when you include it.

#### Installing via package.json
A better approach to managing npm packages in your application is to use the @package.json@ file

    c:\introtonode\npm-pacages> npm install

Then start the application:

    c:\introtonode\npm-packages> node server.js
    c:\introtonode\npm-packages> starting server...

To test your application, simply visit http://127.0.0.1:3000 in your web browser or use curl if you have it:

    $ curl http://127.0.0.1:3000
    $ hello world!