Node.JS vs Other Languages
==========================

Most developers initially struggle with the asynchronous nature of Node.JS, 
ecause we're all trained to think like a procedural programmer where we expect a
function to return a result to us before we move onto the next block of code our
program needs to execute.

Node.JS is fundamentally different in this model, and we'd like to illustrate it
by way of example using the same program written in a few common programming
languages that are found in a lot of moden web development stacks:

````PHP

<?php

/* PHP CODE FOR READING A SIMPLE FILE TO CONSOLE */

var fileOut = file_get_contents(getcwd() . "/README.md");
if (!fileOut)
    echo "Could not read file";
else
    echo fileOut;

?>
````

````PYTHON

""" PYTHON CODE FOR READING A SIMPLE FILE TO CONSOLE """
import os

filePath = os.path.join(os.getcwd(), "README.md")

if not (os.path.exists(filePath)):
    print "Could not read file %s" % filePath
else:
    print open(filePath, "r").readlines()

````
````JS
/** NODE.JS **/
var fs = require("fs");
var filePath = __dirname + "/README.md";
fs.readFile(filePath, "utf-8", function(err, data) {
    if (err)
        return console.log("Could not read file " + filePath);
    console.log(data);
});

````

So what's so different about Node.JS?
--------------------------------------------
Notice how we have the results of our fs.readFile command wrapped in an anonymous
function and the rest of the business logic conditionally writing to console is
contained therein?

This is because *reading to the fileSystem is a non-blocking
asynchronous operation in Node.JS* - the next block of code immediately after that
fs.readFile call would be executed by the Node.JS runtime before the contents of the
file were received by the program.

So instead of doing a standard procedural call, we wrap everything into a callback
that gets executed by the server once the read operation is finished.