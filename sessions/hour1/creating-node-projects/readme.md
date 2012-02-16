Creating Node Projects and How They Look on the Filesystem
--------
The point of this exercise is to understand what Node.JS projects look like on the filesystem and what the best practices are for utilizing files and folders when working with Node.

#### Node Projects on the Filesystem

Simply stated, most production Node applications follow a project structure that looks something like this, where [root] is the name of your project:

	c:\[root]\
	c:\[root]\package.json
	c:\[root]\readme.text
	c:\[root]\.gitignore
	c:\[root]\src
	c:\[root]\src\server.js
	c:\[root]\src\helpers
	c:\[root]\src\helpers\timestamp.js
	c:\[root]\test
	c:\[root]\test\basic-tests.js
	c:\[root]\node_modules

The root folder contains the following files and directories, as explained

* The __package.json__ file, which includes dependencies used both for production and development.
* A __"readme"__ file which explains what the project does - you don't necessarily need one to run your application but it's a good habit to get into.
* A __.gitignore__ file - this file tells Git, the source control engine of choice for most Node developers, which files need should not be included your Node projects. Here's what [Github recommends you include in your .gitignore files for Node](https://github.com/github/gitignore/blob/master/Node.gitignore)
* A __/src__ directory, which contains all of the source code necessary to power your application, including sub-folders like __/src/helpers__.
* A __/test__ directory, which includes any unit tests you might use to test and verify the correctness of your code. We won't delve much into unit testing at Node Bootcamp, but writing unit tests is considered to be a must-have if you're going to develop production Node applications.
* And finally, there's the __node_modules__ folder which is used by npm to install any third-party packages your application depends on, as specified in __package.json__.

#### Why It's Done this Way
There are a lot of different ways you can structure a Node project, but here are the reasons why this is considered to be one of the better ways of doing it:

* By keeping all of your source files and unit tests in seperate sub-directories of the same project, you can cover both areas with the same package.json.
* It cleanly seperates unit tests from your source control and makes it easier to manage both independently.
* Generally it makes easier for someone new to grok your codebase without having to come through everything.

You can, of course, structure your projects any way you want but this is a good pattern to follow, generally speaking.