Node and HTTP
=============

One of the most enticing reasons to use Node is for its high-level HTTP server
library. In fact, starting an HTTP server is as easy as writing just a few
lines of code:

```javascript
var http = require('http');
var server = http.createServer();
server.listen(80, "0.0.0.0");
```

You can request access to this server from your browser, but nothing will happen.
Of course _doing_ something with those requests will be covered later in depth,
but first a brief discourse on ports.

#### Ports

If you run the above code on your local machine and port 80 is unused, it will
start without issue. If you start the process twice, you will get an error:

```
Error: EACCES, Permission denied
```

...along with a stack trace indicating where the problem originated. Although
the error is slightly ambiguous, it is thrown here because the port number is
already in use. Typically with a simple application this is not an issue; you
will only run one process with one entry point.

In a distributed application or on a hosted environment this gets a little
more complex. Since a distributed architecture is outside the scope of this
introduction, let's focus on a shared hosting platform a la Cloud9 IDE.

### Ports in a Shared Environment

When you start a run or debug process on Cloud9, a node process is spawned
in your name. This process is unique and discrete, and operates in a safe
harbor. This means it has restrictions, most of which are hidden to the
developer.

With all these processes operating in a shared environment and applications
starting up HTTP servers, the potential for port collisions is implicit. Thus,
Cloud9 uses an alternative method for port designation: `process.env.PORT`.

Where before the HTTP server was started on port 80, the code now becomes:

```javascript
var http = require('http');
var server = http.createServer();
server.listen(process.env.PORT || 80, "0.0.0.0");
```

What's going on here? Cloud9 keeps an internal list of available ports on the
server. When a process is spawned, it is passed the `process.env` object
and then sets the `process.env.PORT` variable to an available port. Your
spawned process is then mapped to that port.

When access is requested to projectname.username.c9.io, Cloud9 looks at the map
from project/process to the port number and proxies the connection automatically.
Neat huh?

What's great about the `process.env.PORT || 80` setup is Node will "ignore"
`process.env.PORT` if it is not set. This ensures, for example, that if your
application is hosted at "mygreatnodeapp.com" then users accessing it from a
browser (where the default connection port is 80) then everything will function
as intended.