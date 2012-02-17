Windows Azure Table Storage
--------
What is Azure Table Storage, and how does one use it from Node.  This is paraphrased from https://www.windowsazure.com/en-us/develop/nodejs/how-to-guides/table-services/. 

#### What is Windows Azure Table Storage?

Azure Table Storage is a NoSQL type of database which can store enormous amounts of data.  Data are replicated three times within the same datacenter, and tables are geo-replicated between two datacenters hundreds of miles apart.  Tables can be accessed from within Azure, or from a service running elsewhere.  It supports a RESTful API for direct access, or one can use a wrapper for access from various environments including Node.

A single storage account can contain multiple tables.  Each table can contain multiple entities.  An entity is a set of properties, and can be up to 1 MB.  A property is a key-value pair.

#### What are partition keys and row keys?

Partition and row keys are part of an entity.  Entities with the same partition key are stored together and can be queried quickly.  A row key is a unique identifier for each entity.  At the very least, an entity will have a PartitionKey, RowKey, and a Timestamp which is added by Azure and can be ignored.

Quick links to code snippets
--------

#### How to create an Azure table

https://gist.github.com/1813187

#### How to add an entity to a table

https://gist.github.com/1813271

#### How to update an entity

https://gist.github.com/1813285

#### How to change a group of entities

https://gist.github.com/1813293

#### How to query for an entity

https://gist.github.com/1813302

#### How to query a set of entities

https://gist.github.com/1813308

#### How to query a subset of entity properties

NB: This won't work in the storage emulator.
https://gist.github.com/1813327

#### How to delete an entity

https://gist.github.com/1813337

#### How to delete a table

https://gist.github.com/1813345


Demo
--------
Let's build a working demo which uses Azure tables.  When building a website, you'll probably want to use a proper web framework such as Express, but for our purposes we'll keep things deliberately simple.  We'll start with something based on the Hello World example from http://nodejs.org.  Note that the arguments inside `listen()` have changed:

	var http = require('http');
	http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end('Hello World\n');
	}).listen(port);

Let's start by importing some modules we'll be using.  Add these lines at the top of the file:

	var azure = require('azure');
	var formidable = require('formidable'), util = require('util');
	var uuid = require('node-uuid');

`azure` is the Azure SDK, `formidable` is an HTTP forms processing module, `util` contains various utilities, and `node-uuid` will be used to generate UUIDs for the data we'll be putting into Azure Tables.

Next add this line to set up the application for running either locally, in the Cloud9 IDE, or when deployed on Azure:

	var port = process.env.PORT || 1337;  // for C9, Azure, or local.

Cloud9 and Azure use `process.env.PORT`.  If that exists, `port` will be set approriately.  Otherwise, port 1337 will be used for running locally.

Next, add these lines which pertain to Azure:

    var account = azure.ServiceClient.DEVSTORE_STORAGE_ACCOUNT;
    var accountKey = azure.ServiceClient.DEVSTORE_STORAGE_ACCESS_KEY;
    var tableHost = azure.ServiceClient.DEVSTORE_TABLE_HOST;

    if (process.env.C9_PORT) { // Test if we're running on Cloud9. Change these to your own credentials.
        account = 'c9demo';
        accountKey = '<redacted>';
        tableHost = 'http://table.core.windows.net';
    }

    var tableService = azure.createTableService(account, accountKey, tableHost);
    //tableService.logger = new azure.Logger(azure.Logger.LogLevels.DEBUG);

    var tableName = 'wines'; // Name your table here.

Make sure everything still runs at this point.  Be sure to add the modules we'll be using with `npm install`.  If you need to debug your connection to Azure, uncomment the `tableService.logger` line.  This will display lots of information in the console when you run the app.

If the application runs, let's proceed.  Inside `http.createServer()`, add this as the first line of the callback:

	if (req.url === '/favicon.ico') return;

Web browsers attempt to fetch favicons, and this line prevents our application from handling these requests.

Now let's add a form for entering in details about the wine we're drinking.  Remember that we're still inside `http.createServer()`:

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Wine Notebook</h1>');
    var form = '<form action="/addWine" method="post">' +
            '<label for="Category">Category: </label><input name="PartitionKey" type="text" id="Category">' +
            '<label for="Winery">Winery: </label><input name="Winery" type="text" id="Winery"><br />' +
            '<label for="Variety">Variety: </label><input name="Variety" type="text" id="Variety">' +
            '<label for="Vintage">Vintage: </label><input name="Vintage" type="text" id="Vintage"><br />' +
            '<label for="AdditionalKey1">Additional key 1: </label><input name="AdditionalKey1" type="text" id="AdditionalKey1">' +
            '<label for="AdditionalValue1">Additional value 1: </label><input name="AdditionalValue1" type="text" id="AdditionalValue1"><br />' +
            '<label for="AdditionalKey2">Additional key 2: </label><input name="AdditionalKey2" type="text" id="AdditionalKey2">' +
            '<label for="AdditionalValue2">Additional value 2: </label><input name="AdditionalValue2" type="text" id="AdditionalValue2"><br />' +
            '<label for="AdditionalKey3">Additional key 3: </label><input name="AdditionalKey3" type="text" id="AdditionalKey3">' +
            '<label for="AdditionalValue3">Additional value 3: </label><input name="AdditionalValue3" type="text" id="AdditionalValue3"><br />' +
            '<label for="Notes">Notes: </label><textarea name="Notes" rows="6" cols="30" id="Notes"></textarea>' +
            '<input type="submit" value="Add" />' +
            '</form>'
    res.write(form + '<hr />');

Note that the `Content-Type` header is `text/html`, not `text/plain` as you may have seen in other examples.

The `AdditionalKey` and `AdditionalValue` fields are included to illustrate a fundamental concept in Azure Table Storage.  If you think of Azure Tables as traditional relational database tables, you'll miss the real point that Azure Tables are collections of entities, which have key/value properties.  There's no schema to adhere to, and entities can have differing properties in any given table.

To further illustrate this point, we'll display our data in an unordered list.  This emphasizes the schemaless key/value store nature of Azure Table Storage.  If we displayed data in a table with columns and rows, you might continue to think of Azure Table Storage as just limited to that paradigm.  Start by adding these lines:

    // read & display data from table
    var query = azure.TableQuery.select().from(tableName);
    tableService.queryEntities(query, entitiesQueriedCallback);

The query will select all entities from our table.  You can [query for a single entity](https://gist.github.com/1813302) using a slightly different syntax.  In that case, just pass `queryEntity()` a `PartitionKey` and `RowKey` which uniquely identifies an entity, along with the table name and callback.  You can also [query for a set of entities](https://gist.github.com/1813308) using `where()`.

Now lets add `entitiesQueriedCallback`:

    function entitiesQueriedCallback(error, serverEntities) {
        if (error === null) {
            res.write('<ul>');
            for (var index in serverEntities) {
                res.write('<li>' + serverEntities[index].Winery);
                res.write('<form action="/deleteWine" method="post">');
                res.write('<input type="hidden" name="PartitionKey" value="' + serverEntities[index].PartitionKey + '" />');
                res.write('<input type="hidden" name="RowKey" value="' + serverEntities[index].RowKey + '" />');
                res.write('<input type="submit" value="Delete" />');
                res.write('</form>');
                res.write('<ul>');
                for (var prop in serverEntities[index]) {
                    if (prop === 'id' || prop === 'Timestamp' || prop === 'etag' ||
                            prop === 'RowKey' || prop === 'link' || prop === 'updated') continue;
                    if (prop === 'PartitionKey') { // PartitionKey is 'red', 'white', 'rose', etc.
                        res.write('<li>Category: ' + serverEntities[index][prop]);
                        continue;
                    }
                    res.write('<li>' + prop + ': ' + serverEntities[index][prop]);
                }
                res.write('</ul>');
            }
            res.end('<ul>');
        } else {
            res.end('Could not query entities: ' + error.code);
            console.log('Could not query entities: ' + error.code);
        }
    }

This function is called by `tableService.queryEntities()`.  If the call to the database succeeded without an error, then the results are displayed in an unordered list.  Again, this emphasizes the schemaless nature of Azure Table Storage.  In a production application, you'll of course want to make this look better.

First you'll notice an HTML form with two hidden input fields.  These store an entity's `PartitionKey` and `RowKey`, which uniquely identify an entity and will be used by code to delete an entity.  We'll visit this again later.

Take a look at the `for` loop.  Entities contain a `Timestamp` property inserted by Azure.  We'll want to ignore this.  We'll also want to ignore other system properties such as the etag.

The `PartitionKey` is used as the first list item.  As covered earlier, entities with the same `PartitionKey` will be stored together in Azure.  Simply shard your data on various partition keys, and Azure will take care of moving other entities around to avoid database contention.  For our wine application, the `PartitionKey` is the type of wine, be it red, white, rose, or something else.  This means that red wines will be stored separately from white wines, which would help with scaling if this application were to see heavy traffic.

Make sure that the application still runs at this point.  There's no data to display yet, however.

Let's write code to handle the form submission from adding a wine:

    if (req.url == '/addWine' && req.method.toLowerCase() == 'post') {
        // Read http://nodebeginner.org to learn more about formidable.
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('Received this via HTTP POST:\n\n');
            res.write(util.inspect({ fields: fields }) + '\n\n');
            res.end('Check console for status of adding this, and reload "/" to see it.');
            var wine = fields;
            wine['RowKey'] = uuid();
            wine['TastedOn'] = new Date();
            // Add additional keys and values to the entity, making sure they're not empty.  Then delete properties which
            // were parsed from the incoming form data.
            if (fields.AdditionalKey1 !== '') wine[fields.AdditionalKey1] = fields.AdditionalValue1;
            if (fields.AdditionalKey2 !== '') wine[fields.AdditionalKey2] = fields.AdditionalValue2;
            if (fields.AdditionalKey3 !== '') wine[fields.AdditionalKey3] = fields.AdditionalValue3;
            delete wine.AdditionalKey1; delete wine.AdditionalValue1;
            delete wine.AdditionalKey2; delete wine.AdditionalValue2;
            delete wine.AdditionalKey3; delete wine.AdditionalValue3;
            tableService.insertEntity(tableName, wine, entityInsertedCallback);
        });
        return;
    }

When you click the "Add" button, the form is posted back to /addWine and the above code is run.  It uses a module called Formidable which handles all the tricky business of parsing an HTML form.  This code displays the submitted fields with `util.inspect()`.  In production code, you'll probably want to redirect the user back to "/".

To add an entity to Azure Table Storage, simply create a JavaScript object with the properties you want to include.  Each entity must be unique, so be certain to use a unique combination of `PartitionKey`s and `RowKey`s.  Don't set the `Timestamp` as that's done automatically.  The above code uses `var wine = fields` as a starting point.  The `PartitionKey` is actually a form field and is therefore already set.  `wine['RowKey']` is set to a UUID so that each entity is unique.  Remember that the `PartitionKey` in our example is just the type of wine, be it red, white, etc.  You need a unique `RowKey` to make the entity unique.  `wine['TastedOn']` is automatically set to the current date.

The next few lines parse the additional keys and values.  Remember that these are included to illustrate the schemaless nature of Azure Table Storage.  In our app, perhaps a user wants to include a property about which restaurant they were in, or what they were eating at the time, or anything else which comes to mind.

You can't add empty keys to an Azure table, so we check for that.  If a key is not empty, that means a user typed something in.  `wine[fields.AdditionalKey1] = fields.AdditionalValue1` creates a property on the `wine` object with the key and value being what the user typed in.  After this, the `AdditionalKey` and `AdditionalValue` properties must be deleted, or else they'll be added to the entity also.  Finally, the entity is inserted with a call to `insertEntity()`.  Try running the app and adding a wine.  Reload '/' to see what's added.  Play around with including additional properties.  Again, an Azure table is just a collection of entities with various properties.  Entities in a given table are not required to all have the same properties.

Lastly, let's add code to handle deleting an entity.

    if (req.url == '/deleteWine' && req.method.toLowerCase() == 'post') {
        // delete a wine
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('Received this via HTTP POST:\n\n');
            res.write(util.inspect({ fields: fields }) + '\n\n');
            res.end('Check console for status of deleting this, and reload "/" to see it.');
            var wine = fields;
            tableService.deleteEntity(tableName, wine, entityDeletedCallback);
        });
        return;
    }

This is almost the same code as what we used for adding an entity.  You simply create a JavaScript object with a `PartitionKey` and `RowKey`, and then pass it to `deleteEntity()`.  Note that instead of creating a new object with`var wine = fields`, we could have simply passed in `fields` to `deleteEntity()` since `fields` already contains the `PartitionKey` and `RowKey` we want to delete.

If you want to modify an entity instead of deleting it, [the code is the same except call `updateEntity()` instead](https://gist.github.com/1813285).  Naturally, use a different callback.  The take-home lesson is that to delete or modify an entity, simply create a JavaScript object with the appropriate `PartitionKey` and `RowKey` and then call `deleteEntity()` or `updateEntity()`.  When displaying an entity you wish to update in an HTML form, simply use two hidden input fields to store the `PartitionKey` and `RowKey`.  Of course, you'll have to validate that these values have not been tampered with before accepting them before passing your object to `deleteEntity()` or `updateEntity()`.

