// A module for working with wine entities.

var azure = require('azure');
var uuid = require('node-uuid');

var TableQuery = azure.TableQuery;
var tableName = 'wines'; // Name your table here.

var account = 'c9demo';
var account_key = 'vVzGiiiGy5yApG1vWPuO9TrndcI4VrkEHYIy2nV1frRCTcYaNIw5u7O2YMZjeYQ5aN9mCRIUvu/oiUkjdw5+Zw==';

Wine = function () {
    this.tableClient = azure.createTableService(account, account_key);
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
                console.log('Done');
            });
        }
    });
};

exports.Wine = Wine;
