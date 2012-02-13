Saving Files Using Azure Blob Storage
--------
Azure Blob Storage is a masively growable store suited to images, 
large documents, or static web content such as html pages, JavaScript files, 
or CSS.  Items stored in blob storage have their own URL and may have access
control rules applied to them.

### Simple File Upload  
Let's create a simple upload utility.  In REST PUT operations must be
idempotent.  Our file uploader will use the PUT HTTP method to either create
a new blob, or overwrite an existing blob.  Within Azure storage blobs are placed
within a container.  This is similar to a directory...so before we can begin
uploading files, we need to at least have a container to place them into.

First obtain a handle to the blobService:
```JavaScript
var azure = require('azure');
var blobService = azure.createBlobService();
```

Using that handle, a container may be created like this:

```JavaScript
blobService.createContainerIfNotExists(containerName, {
   publicAccessLevel: 'blob'}, containerCreated);
```

We'll obviously need a way for the user to supply a container name, and for that
we'll simply use the request URL.  The REST request is saying "PUT" at new container
at the URL I'm sending to you.  For this we need to parse the URL and split it out a bit:

```JavaScript
    var parts = req.url.split('/', 3);
    var containerName = parts[1];
    var blobName = parts[2];
    if (req.method == 'PUT') {
```

You may test this feature of the example using curl to send a simple PUT request
to the server like this:

```
%curl --request PUT http://kagemusha.tcowan.c9.io/mycontainer1
```

(replacing the URL base with your own running server).  This creates a new container
in your storage account called "mycontainer1".

Your containers may be protected or public.  This exercise will assume public 
access, which will also make it easier to discover the changes you have made
using either 'curl' from the command line or a browser.

The blob service api has several methods for uploading files to blob storage.
Since Node is stream friendly, the easiest thing that can possibly work will
be to take the request input stream, and stream that directly into a new
Azure Blob.  Here's the api signature that will work best

```JavaScript
   blobService.createBlockBlobFromStream( 
      containerName, blobName, stream, size, blobCreatedEvent)
```

Notice we now need two names to specify, the container and the name of the new
blob to "put" within the specified container.  Here's the code snippet from the 
example:
```JavaScript
    var size = req.headers["content-length"];
    blobService.createBlockBlobFromStream(containerName, blobName, req, size, blobCreated);
```
Notice how we are getting the size of the file being sent.  This is standard 
HTTP fair.  What's even more interesting is how the file is being uploaded
to blob storage.  Node.js is stream friendly, and so is the Azure STD.  All that is
required is to pass the request object directly to the <code>createBlockBlobFromStream</code> method,
and the Azure SDK does the rest.  Now all we need is a curl command to upload a file.

```
%curl --data-binary @anyfile.doc --request PUT http://kagemusha.tcowan.c9.io/mycontainer1/anyfile.doc
```
"anyfile.doc" is assumed to be a file on your system.  curl with take that file
and stream it to your Node.js server, which in turn streams the file into Azure
blob storage.  If you want to make sure this is happening, visit https://www.myazurestorage.com and use
the tool to browse your azure storage account.

We'll use the request URL to derive a name for the container and blob.  The
request itself becomes the input stream, and the size of the file contents 
come in the request header:

```JavaScript
    //within HTTP handler method
    var blobName = req.url.substring(1);
    var size = req.headers["content-length"];
    blobService.createBlockBlobFromStream(containerName,
       blobName, req, size, blobCreatedEvent);
```
    