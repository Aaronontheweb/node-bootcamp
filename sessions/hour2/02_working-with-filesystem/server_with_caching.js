var http = require('http');
var fs = require('fs');

var loadedFiles = {};

function returnData(res, code, data) {
    res.writeHead(code, {'Content-Type': 'text/plain'});
    res.end(data);
}

http.createServer(function (req, res) {
    if (loadedFiles[req.url])
        return returnData(res, 200, "Cached: " + loadedFiles[req.url]);

    fs.readFile(__dirname + req.url, 'utf-8', function(err, data) {
        if (err) {
            returnData(res, 404, 'File ' + req.url + ' not found\n');
        }
        else {
            loadedFiles[req.url] = data;
            returnData(res, 200, data);
        }
    });
}).listen(process.env.PORT || 80, "0.0.0.0");