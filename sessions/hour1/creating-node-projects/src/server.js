/* Basic HTTP-based "Hello World" application for Node.JS */

var http = require("http"); //Import the built-in HTTP module

console.log('Starting server...');

var port = process.env.PORT || 3000; //Use a port provided by the process or default over to port 3000

var server = http.createServer(function(req, res){
    console.log('Receiving request');

    // Set the HTTP header to 200-OK
    // and let the browser know to expect content with MIME type text/plain
    res.writeHead(200, {'Content-Type':'text/plain'}); 

    //Send the text "Hello World!" back to the client
    res.end('Hello World!'); 

    console.log('Response written to stream')
}).listen(port); //Listen on a port assigned by the server

console.log("Server listening on port " + port);