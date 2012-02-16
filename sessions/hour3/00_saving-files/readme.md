Saving Files Using Azure Blob Storage
--------
Azure Blob Storage is an expandable data-store suited to images, 
large documents, or static web content such as html pages, JavaScript files, 
or CSS.  Items stored in blob storage have their own URL and may have access
control rules applied to them.

### Simple File Upload  
Let's create a simple upload utility that performs the following tasks:

-   create a new container (similar to a directory)
-   upload a file into blob storage given a container name and file
-   list all containers 
-   list all blobs
-   delete a container
-   delete a blob

Each task will be implemented as a RESTfull api call, allowing us to focus on 
the server side functionality and leverage curl as our client.  (curl is a command
line utility for sending HTTP requets).  Here are some sample calls to show how the 
REST api will appear to a client:

<table>
  <tr>
    <th>HTTP verb</th><th>Content</th><th>URL</th><th>Notes</th>
  </tr>
  <tr>
    <td>PUT</td><td>file</td><td>http://myserver.com/container/newfile</td><td>new file</td>
  </tr>
  <tr>
    <td>PUT</td><td>none</td><td>http://myserver.com/container</td><td>new container</td>
  </tr>
  <tr>
    <td>DELETE</td><td>none</td><td>http://myserver.com/container/newfile</td><td>delete newfile</td>
  </tr>
  <tr>
    <td>DELETE</td><td>none</td><td>http://myserver.com/container</td><td>delete container</td>
  </tr>
  <tr>
    <td>GET</td><td>none</td><td>http://myserver.com/</td><td>list containers</td>
  </tr>
  <tr>
    <td>GET</td><td>none</td><td>http://myserver.com/container</td><td>list files</td>
  </tr>
</table>

Looks like quite a bit of work, doesn't it?  With Node.js and the Azure SDK it's
only going to take about 100 lines of code, including brackets.

####Creating a BLOB Container
In REST PUT operations must be
idempotent.  Our file uploader will use the PUT HTTP method to either create
a new blob, or overwrite an existing blob.  Within Azure storage, blobs are placed
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
we'll use the request URL.  The REST request is saying "PUT" at new container
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

####Uploading a File into Blob Storage
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

####Listing your Containers and Blobs
Before we discuss the listing feature, go ahead and create a few more containers so you'll have something
to list.

```
   %curl --request PUT http://kagemusha.tcowan.c9.io/mycontainer1
   %curl --request PUT http://kagemusha.tcowan.c9.io/mycontainer2
   %curl --request PUT http://kagemusha.tcowan.c9.io/mycontainer3
   %curl --request PUT http://kagemusha.tcowan.c9.io/mycontainer4

```

So far we've been using PUT to add new things to Azure storage.  Listing is a request
to "GET" a list of something, so naturally we'll use an HTTP GET.  Here's the code 
that lists both containers and blobs:

```JavaScript
   else if (req.method == 'GET') {
        if (containerName == "") {
            //list containers
             blobService.listContainers(function (error, containers) {
                if (error) {
                   console.log(error);
                } else {
                  containers.forEach(function (container) {
                    res.write(container.name + '\r\n');
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
                    res.write(blob.name  + " (" + blob.url +  ')\r\n');
                  });
                }
                res.end();
             });
        }
```

Just as before, we are using the request URL to help us decide what is being requested.
A URL that points to the root of our server will list all containers.  A URL that points
to any particular container will list BLOBS within that container.  Notice how the BLOBs are listed to
include a url, <code>blob.url</code>.  That url points directly to blob storage, bypassing
your Node.js server.  While you can stream files from Node, it's important to know that
Azure Storage will stream blobs for you.  In cases where you are delivering public images, files, or content it 
will be more affordable to use the blobs public URL vs. streaming from your own server.  Now lets look 
at the curl command to invoke this feature.  This is the simplest of all curl commands, a simplet get on a URL. 
This command asks our sample Node.js server to list all containers in your azure storage account:

```
%curl http://kagemusha.tcowan.c9.io
```

To list all BLOBS in container "mycontainer2" use this curl command:

```
%curl http://kagemusha.tcowan.c9.io/mycontainer2
```

####Deleting Containers and Blobs
After what we've done till now, this will seem a bit anticlimactic.  Delete will obviously
be served by the HTTP verb "DELETE".  Essentially we'll be using DELETE instead of PUT against
similar URL strings.  To keep the code short and example simple, I've used the
number of path seperated values in the request URL to decide if we're deleting a container or blob:

```JavaScript
       if (parts.length < 3)
            blobService.deleteContainer(containerName, containerDeleted);
        else
            blobService.deleteBlob(containerName, blobName, blobDeleted);
 ```

And the curl commands (assuming a blob uploaded as "blob1"):

```
   %curl --request DELETE http://kagemusha.tcowan.c9.io/mycontainer1/blob1
   %curl --request DELETE http://kagemusha.tcowan.c9.io/mycontainer1
```
