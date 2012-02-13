Saving Files Using Azure Blob Storage
--------
Azure Blob Storage is a masively growable store suited to images, 
large documents, or static web content such as html pages, JavaScript files, 
or CSS.  Items stored in blob storage have their own URL and may have access
control rules applied to them.

#### Simple File Upload 
Let's create a simple upload utility.  In REST PUT operations must be
idempotent.  Our file uploader will use the PUT HTTP method to either create
a new blob, or overwrite an existing blob.

First obtain a handle to the blobService:
'''JavaScript
var azure = require('azure');
var blobService = azure.createBlobService();
'''

The blob service api has several methods for uploading files to blob storage.
Since Node is stream friendly, the easiest thing that can possibly work will
be to take the request input stream, and stream that directly into a new
Azure Blob.  Here's the api signature that will work best

   '''JavaScript
   blobService.createBlockBlobFromStream( 
      containerName, blobName, stream, size, blobCreatedEvent)
   '''
   
We'll use the request URL to derive a name for the container and blob.  The
request itself becomes the input stream, and the size of the file contents 
come in the request header:

    '''
    //within HTTP handler method
    var blobName = req.url.substring(1);
    var size = req.headers["content-length"];
    blobService.createBlockBlobFromStream(containerName,
       blobName, req, size, blobCreatedEvent);
    '''
    