/* Basic HTTP server that just returns up the current time as a UNIX timestamp */
var http = require("http") //Import the built-in HTTP module
  , timestamp = require("./helpers/timestamp"); //Import our user-defined timestamp module
  
console.log('Starting server...');

var port = process.env.PORT || 3000;

var server = http.createServer(function(req, res){
    console.log('Receiving request [%s]', timestamp.currentTime());

    // Set the HTTP header to 200-OK
    // and let the browser know to expect content with MIME type text/plain
    res.writeHead(200, {'Content-Type':'text/plain'}); 
    res.end(timestamp.currentTime())
    console.log('Response written to stream [%s]', timestamp.currentTime())
}).listen(port); //Listen on a port provided by the system or port 3000

console.log("Server listening on port " + port);