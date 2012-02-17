Using continuation tokens from Azure Table Storage for pagination
--------

Imagine you have millions of entities in an Azure table, and you want to page through them displaying 20 entities at a time.  Fetching all entities and then dividing them into groups of 20 is hardly the most efficient way to do this.  In addition, at the time this document is being written, Azure limits the number of returned entities to 1000 in any given request.  Among other things, this keeps developers from accidentally querying for millions of entities.

Azure Table Storage supports continuation tokens to support this scenario.  You fetch a group entities, and the result contains a continuation token if there are more entities remaining to be fetched.  The continuation token is like a bookmark which indicates where the query left off.  For example, if you fetched entities 1-20, a continuation token would be included which would tell you to begin your next query at entity number 21.  This is how you can efficiently page through a large number of entities.

`table-storage-pagination-sample.js` illustrates how to do pagination in Node with Azure tables.  It creates a sample database containing `totalEntities` number of entities.  It then queries the results and displays `pageSize` entities per page.

`createTableIfNotExists()` simply creates a table and populates it with sample data using a batch insertion.  These can include at most 100 entities at a time, so the code loops through this operation until the number of entities in `totalEntities` has been created.  Make `totalEntities` a multiple of 100 so that `totalEntities / 100` is an integer.  This indicates how many batches of 100 insertions should be performed.

In `http.createServer()` we ignore requests for `/favicon.ico` for the same of simplicity.

Skip over the `if` block which handles requests to `/nextPage` for now.  We'll come back to it.

This line defines our initial query:

	var query = azure.TableQuery.select().from(tableName).top(pageSize);

You've probably seen `select()` and `from()` before.  `top()` limits the query to `pageSize` number of entities.

In the parameter list for `entitiesQueriedCallback`, note that we now include `pageContinuation`.  This object contains the continuation token.  If you're curious, set a breakpoint or use `console.log()` to inspect `pageContinuation`.  You'll see that it contains these properties: `tableService`, `tableQuery`, `nextPartitionKey`, and `nextRowKey`.

`entitiesQueriedCallback` loops through the results and uses `counter` to keep track of how many total results have so far been returned.  `counter` is initialized at the top of `http.createServer()` because it's also used by the `if` block which handles requests for `/nextPage`.

If there are more entities yet to be retrieved, `pageContinuation.hasNextPage()` will return true.  If that's the case, then we emit a link to `/nextPage` which includes `nextPartitionKey` and `nextRowKey` as query strings.

In the `if` block which handles requests for `/nextPage`, we use the `querystring` module to extract `nextPartitionKey` and `nextRowKey` from the requested URL.  We then create `nextPageQuery` which contains these keys and pass it to `queryEntities()`.
