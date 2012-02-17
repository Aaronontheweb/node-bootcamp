var http = require('http');
var url = require('url');
var querystring = require('querystring');
var azure = require('azure');
var uuid = require('node-uuid');
var port = process.env.PORT || 1337;  // for C9, Azure, or when running locally.

var totalEntities = 100;
var pageSize = 20;

var account = azure.ServiceClient.DEVSTORE_STORAGE_ACCOUNT;
var accountKey = azure.ServiceClient.DEVSTORE_STORAGE_ACCESS_KEY;
var tableHost = azure.ServiceClient.DEVSTORE_TABLE_HOST;

if (process.env.C9_PORT) { // Test if we're running on Cloud9. Change these to your own credentials.
    account = 'c9demo';
    accountKey = '<redacted>';
    tableHost = 'http://table.core.windows.net';
}

var tableService = azure.createTableService(account, accountKey, tableHost);
//tableService.logger = new azure.Logger(azure.Logger.LogLevels.DEBUG);  // Uncomment this to enable logging

var tableName = 'largetable2231'; // Name your table here.

// Create and populate the table.  Note that for batch operations,
// the PartitionKey must be the same for all entities.
tableService.createTableIfNotExists(tableName, function (err, created) {
    if (created) {
        var numberOfBatches = parseInt(totalEntities / 100);
        for (var i = 0; i < numberOfBatches; i++) {
            tableService.beginBatch();
            var now = new Date().toString();
            for (var j = 0; j < 100; j++) { // Batches can include at most 100 entities.
                tableService.insertEntity(tableName, { PartitionKey: 'White', RowKey: (i * 100 + j + 1).toString(), Winery: 'Azure Vineyards', Variety: 'Chardonnay', Vintage: '2003', Notes: uuid(), TastedOn: now });
            }
            tableService.commitBatch(function () {
                console.log('Initialized table "' + tableName + '" with 100 sample entities.');
            });
        }
    }
});

http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') return;

    if (url.parse(req.url).pathname === '/nextPage') {
        var parsedQuerystring = querystring.parse(url.parse(req.url).query);
        console.log(parsedQuerystring.nextPartitionKey);
        console.log(parsedQuerystring.nextRowKey);
        var pageContinuation = new QueryEntitiesResultContinuation(tableService, tableQuery, nextPartitionKey, nextRowKey);  // ??
        listNextPage(parsedQuerystring);
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    var query = azure.TableQuery.select().from(tableName).top(pageSize);
    tableService.queryEntities(query, entitiesQueriedCallback);
    var counter = 0;
    function entitiesQueriedCallback(error, serverEntities, pageContinuation) {

        if (error === null) {
            for (var index in serverEntities) {
                res.write(serverEntities[index].RowKey + '<br />');
                counter++;
            }
            res.write('Found ' + counter + ' entities. <br />');
            //listNextPage(pageContinuation);
            console.log(pageContinuation);
            res.write('<a href="nextPage?nextPartitionKey=' + pageContinuation.nextPartitionKey + '&nextRowKey=' + pageContinuation.nextRowKey + '">Next page</a>');
            res.end();
        } else {
            res.end('Could not query entities: ' + error.code);
            console.log('Could not query entities: ' + error.code);
        }
    }

    function listNextPage(pageContinuation) {
        tableService.queryEntities(query, function (queryError, serverEntities, pageContinuation) {

            if (pageContinuation.hasNextPage()) {

                pageContinuation.getNextPage(function (queryError2, serverEntities2, entriesContinuation2) { // If we’re expecting more than just one page, this could be recursive.
                    for (var index in serverEntities2) {
                        res.write(serverEntities[index].RowKey + '\n');
                        counter++;
                    }
                    res.write('Found ' + counter + ' more entities.\n');
                    listNextPage(entriesContinuation2);
                    //res.end('got here');
                })
                //res.end('got here');
            }
            //res.end('got here');
        });
        //res.end();
    }



    //    function listNextPage(pageContinuation) {
    //        tableService.queryEntities(query, function (queryError, serverEntities, pageContinuation) {

    //            if (pageContinuation.hasNextPage()) {

    //                pageContinuation.getNextPage(function (queryError2, serverEntities2, entriesContinuation2) { // If we’re expecting more than just one page, this could be recursive.
    //                    for (var index in serverEntities2) {
    //                        res.write(serverEntities[index].RowKey + '\n');
    //                        counter++;
    //                    }
    //                    res.write('Found ' + counter + ' more entities.\n');
    //                    listNextPage(entriesContinuation2);
    //                    //res.end('got here');
    //                })
    //                //res.end('got here');
    //            }
    //            //res.end('got here');
    //        });
    //        //res.end();
    //    }
    //res.end('the end');
}).listen(port);
