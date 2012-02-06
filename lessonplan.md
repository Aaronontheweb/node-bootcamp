## Node Bootcamp Lesson Plan

1. __Hour 1: Introduction to Node.JS__
    * "Hello World" from Azure
        * How to set up an Azure account
        * How to configure Cloud9 to deploy to Azure
        * Deploy a "Hello World!"
    * What is Node and how does it work?
    * The Node Event Loop 
    * JavaScript and Node
    * JavaScript primer
        * Objects and variables
        * The JavaScript typing system
        * Functions
        * JavaScript event model and callbacks
        * Closures and passing arguments
        * Node.JS patterns for functions
    * Creating Node projects
        * Hello World
        * What a Node project looks like in the filesystem
    * Node modules
        * Introduction to modules
        * Writing your own module
        * Using Node Package Manager (npm)
        * Package.json
    
2. __Hour 2: Node and Web Applications__
    * HTTP and Node
        * Ports and process.env.PORT 
    * Responding to requests
        * Response object
        * Content types
        * Serving HTML
    * Working with the filesystem
        * Reading files
        * Sending HTML files in Response objects
    * Handling and routing requests
        * Breaking down an HTTP request into usuable parts
        * Parsing arguments with the URL module
            * Paths
            * Querystrings
        * Writing a route handler that handles multiple routes
            * Passing arguments to route handlers  
    * Working with Forms and HTTP Verbs
        * HTTP Verbs
        * Creating forms
        * Handling form submissions
        * Post-Redirect-Get in Node
    * Creating strongly-typed objects in Node
        * .prototype syntax
        * Sample data model

3. __Hour 3: Building Real Web Applications with Node__
    * Saving Files
        * Overview of Windows Azure Blob Storage 
        * Saving files to Blob Storage
        * Getting files from Blob Storage
    * Working with a Database
        * Overview of Windows Azure Table Storage
        * Using Azure Table Storage in Node.JS
            * Saving records
            * Looking up a specific key
            * Queries
            * Updating records
    * Working with Cookies
        * What are cookies?
        * Setting cookie values
        * Getting cookie values
        * Deleting cookies

4. __Optional: Socket.IO Breakout Session__
    * What is Socket.IO?
    * Introduction to WebSockets and Server-push
    * Socket.IO scenarios
    * Socket.IO overview
        * Server-side "Hello World"
        * Client-side "Hello World"
    * Socket.IO 101
        * Opening anc closing connections
        * Broadcasting (to everyone)
        * Broadcasting to groups

5. __Optional: Express Breakout Session__
    * What is Express?
    * Introduction to MVC
    * Connect Middleware
    * Getting Started with Express
        * Installing Express
        * Scaffolding Express applications
        * Express project structure
    * Routing
        * Introduction to routes
        * Handling HTTP verbs
        * Writing route handlers
        * Passing route variables
        * Creating route modules
    * Creating Views
        * Introduction to Jade
        * Basic rules
        * Working with variables
        * Working with conditionals
        * Iterating over collections
        * Creating a layout
        * Creating a partial
        * Creating a view
        * Referencing a view from inside a route handler
    * Working with the Response object
        * Setting response headers
        * Passing local variables to views
        * Passing objects back to views
        * Creating Redirects
        * Sending downloadable files
    * Working with the Request object
        * Parsing incoming arguments with Request.Param
        * Working with sessions
        * Working with the Request.Flash object
    * Express Extras
        * Dynamic view helpers
        * App.param interceptors
        * Catch-all routes
    * Creating real data models with Azure Table Storage
        * How table storage works
        * How to install the Azure npm module
        * Connecting to your table storage account
        * Writing a real table storage model
        * Integrating your model with route handlers in Express