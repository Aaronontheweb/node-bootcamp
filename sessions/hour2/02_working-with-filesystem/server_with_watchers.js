var http = require('http');
var fs = require('fs');

var loadedFiles = {};

function returnData(res, code, data) {
    res.writeHead(code, {'Content-Type': 'text/plain'});
    res.end(data);
}

http.createServer(function (req, res) {
    var fullPath = __dirname + req.url;

    if (loadedFiles[fullPath])
        return returnData(res, 200, "Cached: " + loadedFiles[fullPath]);

    fs.readFile(fullPath, 'utf-8', function(err, data) {
        if (err) {
            returnData(res, 404, 'File ' + req.url + ' not found\n');
        }
        else {
            // Start watching the file for changes
            fs.watchFile(fullPath, function(curr, prev) {
                // We only want to know when the "modified" time was updated
                if (curr.mtime.getTime() != prev.mtime.getTime()) {
                    console.log("Cached file [" + fullPath + "] was updated");

                    // Read in the file again
                    fs.readFile(fullPath, 'utf-8', function(err, data) {
                        if (!err)
                            loadedFiles[fullPath] = data;
                    });
                }
            });

            loadedFiles[fullPath] = data;
            returnData(res, 200, data);
        }
    });
}).listen(process.env.PORT || 80, "0.0.0.0");