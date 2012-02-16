var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile(__dirname + req.url, 'utf-8', function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('File ' + req.url + ' not found\n');
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(data);
        }
    });
}).listen(process.env.PORT || 80, "0.0.0.0");