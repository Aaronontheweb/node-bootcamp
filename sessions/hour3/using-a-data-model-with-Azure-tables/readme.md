Using a data model with Azure Table Storage
--------

The Wine *Node*book example works fine with one type of entity (a wine) and a few operations.  However, things will get substantially more complicated if we add more entity types, more operations, and CSS styles.  As a step towards the MVC pattern, let's refactor our code and create a data model prototype for a wine.

`models/wine.js` contains a module for working with our wine entities.  Since we're just refactoring the old example, I'll just highlight certain parts of the file.

The constructor supplies our credentials to `createTableService()`:

	Wine = function () {
	    this.tableClient = azure.createTableService(account, accountKey, tableHost);
	}

The constructor is exported in the last line of the file.

In JavaScript, one can add methods to an object by adding them to the prototype.  For example, here's how we define a `findAll` method to retrieve all entities from a table:

	Wine.prototype.findAll = function (entitiesQueriedCallback) {
	    var tableQuery = TableQuery.select()
	                               .from(tableName);
	    this.tableClient.queryEntities(tableQuery, entitiesQueriedCallback);
	};

Note that we still call `entitiesQueriedCallback` as we did in the previous example.

The code for `findSingleEntity`, `destroy`, and `save` should be self-explanatory since you've already seen it in the previous example.  We had to use `destroy` because `delete` is a reserved JavaScript keyword.

The `init` method creates the table if it doesn't exist, and then adds sample data using a batch transaction.  Batching up transactions is an efficient way to talk to Azure Table Storage.  In this example, three wines are added in one batch transaction rather than three separate operations.  Note that all entities in a batch transaction must have the same `PartitionKey`.

Now take a look at `winenotebook_with_model.js`.  We've added this line to use the module we just created:

	var Wine = require('./models/wine').Wine;

We no longer need the call to `createTableService()` or the table name, since that's handled by our module.  We also don't need to create the table since our `init` method does this.  Inside `createServer()`, note that we no longer use `insertEntity()` or `deleteEntity()` and instead make calls to `wines.save()` and `wines.destroy()`.  Lastly, the call to `queryEntities()` has been replaced by `wines.findAll()`.

Not only has our code been simplified, but it can now be easily reused by other applications.  Simply import the module with `require()` and invoke the constructor with `new`.  Methods attached to the entity prototype will then become available to your application.

