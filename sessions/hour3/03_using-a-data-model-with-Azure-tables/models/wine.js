// A module for working with wine entities.

var azure = require('azure');
var uuid = require('node-uuid');

var TableQuery = azure.TableQuery;
var tableName = 'wines'; // Name your table here.

var account = azure.ServiceClient.DEVSTORE_STORAGE_ACCOUNT;
var accountKey = azure.ServiceClient.DEVSTORE_STORAGE_ACCESS_KEY;
var tableHost = azure.ServiceClient.DEVSTORE_TABLE_HOST;

if (process.env.C9_PORT) { // Test if we're running on Cloud9. Change these to your own credentials.
    account = 'c9demo';
    accountKey = '<redacted>';
    tableHost = 'http://table.core.windows.net';
}

Wine = function () {
    this.tableClient = azure.createTableService(account, accountKey, tableHost);
}

Wine.prototype.findAll = function (entitiesQueriedCallback) {
    var tableQuery = TableQuery.select()
                               .from(tableName);
    this.tableClient.queryEntities(tableQuery, entitiesQueriedCallback);
};

Wine.prototype.findSingleEntity = function (wine, callback) {
    this.tableClient.queryEntity(tableName, wine.PartitionKey, wine.RowKey, callback);
};

Wine.prototype.destroy = function (wine, entityDeletedCallback) {
    this.tableClient.deleteEntity(tableName, wine, entityDeletedCallback);
};

Wine.prototype.save = function (wine, entityInsertedCallback) {
    this.tableClient.insertEntity(tableName, wine, entityInsertedCallback);
};

Wine.prototype.init = function () {
    // Puts sample entities into the table.  Note that for batch operations,
    // the PartitionKey must be the same for all entities.
    var provider = this;
    this.tableClient.createTableIfNotExists(tableName, function (err, created) {
        if (created) {
            provider.tableClient.beginBatch();
            var now = new Date().toString();
            provider.tableClient.insertEntity(tableName, { PartitionKey: 'White', RowKey: uuid(), Winery: 'Azure Vineyards', Variety: 'Chardonnay', Vintage: '2003', Notes: 'Buttery and smooth.', TastedOn: now });
            provider.tableClient.insertEntity(tableName, { PartitionKey: 'White', RowKey: uuid(), Winery: 'Node Estates', Variety: 'Pinot Grigio', Vintage: '2008', Notes: 'Delicious.', TastedOn: now });
            provider.tableClient.insertEntity(tableName, { PartitionKey: 'White', RowKey: uuid(), Winery: 'Chateau C9', Variety: 'Sauvignon Blanc', Vintage: '2009', Notes: 'Hints of apricot.', TastedOn: now });
            provider.tableClient.commitBatch(function () {
                console.log('Initialized table "' + tableName + '" with sample data.');
            });
        }
    });
};

exports.Wine = Wine;
