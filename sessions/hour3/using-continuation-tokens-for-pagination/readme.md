Using continuation tokens from Azure Table Storage for pagination
--------

Imagine you have millions of entities in an Azure table, and you want to page through them displaying 25 entities at a time.  Fetching all entities and then dividing them into groups of 25 is hardly the most efficient way to do this.  In addition, Azure limits the number of returned entities to 1000 at the time this document is being written.  Among other things, this keeps programmers from accidentally querying for millions of entities.

Azure Table Storage supports continuation tokens to support this scenario.  You would fetch a group entities, and the result would contain a continuation token if there were more entities remaining to be fetched.  The continuation token is like a bookmark which indicates where the query left off.  For example, if you fetched entities 1-25, a continuation token would be included which would tell you to begin your next query at entity number 26.  This is how you can efficiently page through a large number of entities.

