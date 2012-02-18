Installing and Using Modules via Node Package Manager (npm) 
--------

The code in this particular example serves plain text back in response to an HTTP request
connection after using a third-party module to alter the case of the sentence we're sending back to the end-user.

This simple Node.JS application depends on the [slang](https://github.com/devongovett/slang) package, so we have to install it via [npm](http://npmjs.org/ "Node Package Manager").

#### Installing npm Packages via npm install {package name}
npm is the central package repository for Node.JS. As of writing this NPM has just under 7,000 packages that are free for you to include in your Node applications as you see fit.

The npm utility is installed by default whenever you [install the Node.JS runtime](http://nodejs.org/) on any system.

To install a package manually, all you need to do is use the _npm install_ command followed by the package name, like so:

    c:\introtonode\npm-packages> npm install slang

This will automatically install the slang binaries in a @node_modules@ subdirectory of your current working folder:

	c:\introtonode\npm-packages
	c:\introtonode\npm-packages\server.js
	c:\introtonode\npm-packages\node_modules\
	c:\introtonode\npm-packages\node_modules\slang\
	c:\introtonode\npm-packages\node_modules\slang\... {module files}

Now you can include the slang module anywhere in your current Node application, like this:

	var slang = require("slang")

Node's module system knows to always search in your project's @node_modules@ directory when looking for modules to include, so you never need to worry about relative paths and such when you include it.

#### Installing via package.json
A better approach to managing npm packages in your application is to use the @package.json@ file - this package describes all of the dependenices your application has for both development mode and production mode, and npm can use this information to automatically install all of your packages with one simple command:

    c:\introtonode\npm-packages> npm install

When you run @npm install@ in the same directory as your package.json file, npm will automatically ingest the contents of it and install all of the packages listed.

Here's what the syntax looks like for the package.json file included in this example:

	{
	    "name": "npm-package-example"
	  , "version": "0.0.1"
	  , "private": true
	  , "dependencies": {
	      "slang":">=0.2.0"
	  }
	}

This package.json file specifies that this application requires a version of the slang package that is at least version 0.2.0, so as new versions are released npm will always install the latest. If the application needed to run a specific version of slang for compatability or stability reasons, you could tell npm to install only version 0.2.0 like this

	{
	    "name": "npm-package-example"
	  , "version": "0.0.1"
	  , "private": true
	  , "dependencies": {
	      "slang":"0.2.0"
	  }
	}

Package.json is important because this is often what's used to tell your webservers in production environments what packages are needed in order to run your application; otherwise you'd have to manually manage package installations on each server which isn't a scalable or safe approach to package management.

#### Running the Sample Application

To run the example code included in this directory:

	c:\introtonode\npm-packages> npm install
    c:\introtonode\npm-packages> node server.js
    c:\introtonode\npm-packages> starting server on port {PORT}

To test your application, simply visit http://127.0.0.1:{PORT} in your web browser or use curl if you have it:

    $ curl http://127.0.0.1:{PORT}
    $ hello world!

#### Where can I get `curl` for Windows?

* It's included in [Git Bash](http://code.google.com/p/msysgit/).
* It's included in [GOW: GNU on Windows](https://github.com/bmatzelle/gow).
* It can be installed with [Cygwin](http://cygwin.com/).
* You can download other builds from the [curl homepage] (http://curl.haxx.se/download.html).

#### From the [npm FAQ](http://npmjs.org/doc/faq.html): "Should I check my `node_modules` folder into git?"

* Check `node_modules` into git for things you deploy, such as websites and apps.
* Do not check `node_modules` into git for libraries and modules intended to be reused.
* Use `npm` to manage dependencies in your dev environment, but not in your deployment scripts.

#### Finding `npm` modules

Browse http://search.npmjs.org/ or use `npm search`.  Also, some modules like HTTP are so important they ship with Node.  See http://nodejs.org/docs/latest/api/index.html.

#### How can I redownload modules that have changed?

You can simply delete the module from `node_modules` and then run `node install module` again.  You may wish to run `npm cache clean` to force a module to be redownloaded from npmjs.org.  If you're on Windows and get errors when installing a module, try deleting everything under ~\appcache\roaming\npm-cache.  This is likely a bug in npm version 1.1.0-3.

