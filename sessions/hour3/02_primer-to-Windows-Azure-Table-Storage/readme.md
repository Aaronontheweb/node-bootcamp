#Primer to Windows Azure Table Storage
##Windows Azure Storage
Apart from SQL Azure, there are three storage options in Windows Azure Storage:

- blobs (pictures, video, audio, etc.)

- queues (web role-worker role messaging, etc.)

- tables

Note: All are replicated three times

##Windows Azure Table Storage
We'll focus on tables, but in general, you want to choose to use tables when...

- if data > 50GB on single instance

- if you don't need relational store

Basic facts about tables

- Accessed via a Uri like 'http://myaccount.table.core.windows.net'

- Max size 100TB

When naming a table, the name...

- can only contain alphanumeric char

- cannot begin with numeric character

- case-sensitive

- between 3 to 63 characters wrong


##Understanding tables...

- don't associate tables in SQL with 'table' in Windows Azure Table Storage

- think of 'table' as a object storage,

- tables are really a simple hierarchy of entities:
	- Account
		- Table
			- Entity (aka row)
				- Columns (aka values)

###Entities
- Tables store data as collection of entities

- Entities are like rows, but BUT each row can contain different number of columns or properties
 

###Properties
- Properties are name-value pairs

- Each entity has a primary key + set of up to 255 properties

- inclusive of three system properties:
	- PartitionKey
	- RowKey
	- Timestamp

- Naming a property: up to 255 char- 

- conform to subset of data types defined in ADO.NET Data Service
	- byte, bool, DateTime, double, Guid, Int32 (int), Int64 (long), string