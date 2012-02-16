Windows Azure Table Storage
--------
What is Azure Table Storage, and how does one use it from Node.  This is paraphrased from https://www.windowsazure.com/en-us/develop/nodejs/how-to-guides/table-services/. 

#### What is Windows Azure Table Storage?

Azure Table Storage is a NoSQL type of database which can store enormous amounts of data.  Data are replicated three times within the same datacenter, and tables are geo-replicated between two datacenters hundreds of miles apart.  Tables can be accessed from within Azure, or from a service running elsewhere.  It supports a RESTful API for direct access, or one can use a wrapper for access from various environments including Node.

A single storage account can contain multiple tables.  Each table can contain multiple entities.  An entity is a set of properties, and can be up to 1 MB.  A property is a key-value pair.

#### What are partition keys and row keys?

Partition and row keys are part of an entity.  Entities with the same partition key are stored together and can be queried quickly.  A row key is a unique identifier for each entity.

Demo
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
