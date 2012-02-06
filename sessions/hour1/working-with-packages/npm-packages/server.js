/* Basic HTTP server that uses a third-party NPM package */

var http = require("http") //Import the built-in HTTP module
  , slang = require("slang"); /* use npm install in the root/npm-packages directory to install slang */

console.log('Starting server...')

var server = http.createServer(function(req, res){
    console.log('Receiving request');

    // Set the HTTP header to 200-OK
    // and let the browser know to expect content with MIME type text/plain
    res.writeHead(200, {'Content-Type':'text/plain'}); 

    //Uses slang module to convert the output to read "hello world" in all lower caps
    res.end(slang.uncapitalizeWords('Hello World!')); 

    console.log('Response written to stream')
}).listen(process.env.PORT); //Listen on a port assigned by the server

console.log("Server listening on port " + process.env.PORT);