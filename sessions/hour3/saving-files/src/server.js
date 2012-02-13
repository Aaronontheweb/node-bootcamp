var azure = require('azure');
var http = require('http');
var port = process.env.PORT;
var blobService = azure.createBlobService();

http.createServer(function(req, res) {

    var parts = req.url.split('/', 3);
    var containerName = parts[1];
    var blobName = parts[2];
    if (req.method == 'PUT') {
        if (parts.length < 3) {
            blobService.createContainerIfNotExists(containerName, {
                publicAccessLevel: 'blob'}, containerCreated);
        }
        else {
            var size = req.headers["content-length"];
            blobService.createBlockBlobFromStream(containerName, blobName, req, size, blobCreated);
        }
    }
    else if (req.method == 'DELETE') {
        if (parts.length < 3)
            blobService.deleteContainer(containerName, containerDeleted);
        else
            blobService.deleteBlob(containerName, blobName, blobDeleted);
    }
    else if (req.method == 'GET') {
        if (parts.length < 2) {
            //list containers
             blobService.listBlobs(containerName, function (error, blobs) {
                if (error) {
                   console.log(error);
                } else {
                  blobs.forEach(function (blob) {
                    res.write(blob.name);
                  });
                }
                res.end();
             });
        } else {
            // list blobs
             blobService.listBlobs(containerName, function (error, blobs) {
                if (error) {
                   console.log(error);
                } else {
                  blobs.forEach(function (blob) {
                    res.write(blob.name);
                  });
                }
                res.end();
             });
        }
    }

    function containerDeleted(error) {
        res.end('container deleted');
    }
    
    function containerCreated(error) {
        console.log(error);
        if (error === null) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Successfully created container\r\n");
        }
        else {
            res.end('Could not create container');
        }
    
    }
    function blobCreated(error, serverBlob) {
        if (error === null) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Successfully uploaded blob " + serverBlob.blob + '\r\n');
        }
        else {
            res.end('Could not upload blob: ' + error.Code);
        }
    }

    function blobDeleted(error) {
        if (error === null) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Successfully deleted blob\r\n");
        }
        else {
            res.end('Could not delete blob: ');
        }
    }

}).listen(port);