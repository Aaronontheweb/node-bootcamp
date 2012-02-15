var http = require('http');
var formidable = require('formidable'), util = require('util');
var uuid = require('node-uuid');
var port = process.env.PORT || process.env.port || 1337;  // for C9, Azure, or local.
var server = '127.0.0.1';
var azure = require('azure');
var tableService = azure.createTableService(azure.ServiceClient.DEVSTORE_STORAGE_ACCOUNT, azure.ServiceClient.DEVSTORE_STORAGE_ACCESS_KEY, azure.ServiceClient.DEVSTORE_TABLE_HOST);

var tableName = 'wines2335'; // Name your table here.

// Create the table
tableService.createTableIfNotExists(tableName, tableCreatedOrExists);
function tableCreatedOrExists(error) {
    if (error === null) {
        console.log('Using table ' + tableName + '\r\n');
    } else {
        console.log('Could not use table: ' + error.code);
    }
}

function entityInsertedCallback(error, serverEntity) {
    if (error === null) {
        console.log('Successfully inserted entity ' + serverEntity.Winery
                    + ' \r\n');
    } else {
        console.log('Could not insert entity into table: ' + error.code);
    }
}

http.createServer(function (req, res) {

    if (req.url === '/favicon.ico') return;

    if (req.url == '/addWine' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received upload:\n\n');
            res.end(util.inspect({ fields: fields, files: files }));
            var wine = fields;
            wine['RowKey'] = uuid();
            wine['TastedOn'] = new Date();
            wine[fields.AdditionalKey1] = fields.AdditionalValue1;
            delete wine.AdditionalKey1; delete wine.AdditionalValue1;
            wine[fields.AdditionalKey2] = fields.AdditionalValue2;
            delete wine.AdditionalKey2; delete wine.AdditionalValue2;
            wine[fields.AdditionalKey3] = fields.AdditionalValue3;
            delete wine.AdditionalKey3; delete wine.AdditionalValue3;
            tableService.insertEntity(tableName, wine, entityInsertedCallback);
        });
        //        res.writeHead(302, { 'Location': 'http://' + server + ':' + port,
        //            'Cache-Control': 'no-cache' });
        //        res.end();
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' });
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
    res.write(form);

    // read data from table
    console.log('reading data from table');
    var query = azure.TableQuery.select().from(tableName);
    tableService.queryEntities(query, entitiesQueriedCallback);
    function entitiesQueriedCallback(error, serverEntities) {
        if (error === null) {
            res.write('<ul>');
            for (var index in serverEntities) {
                res.write('<li>' + serverEntities[index].Winery);
                //res.write('<input type="button" name="' + serverEntities[index].RowKey + '" value="Delete" />');
                res.write('<ul>');
                for (var prop in serverEntities[index]) {
                    if (prop === 'id' || prop === 'RowKey' || prop === 'Timestamp' || prop === 'etag'
                            || prop === 'link' || prop === 'updated') continue;
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

}).listen(port, server);
console.log('Server running at http://' + server + ':' + port + '/');
