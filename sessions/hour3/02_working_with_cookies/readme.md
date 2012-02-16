Working with Cookies:
=====================



* What are cookies?
* Setting cookie values
* Getting cookie values
* Deleting cookies


```JavaScript
var http = require('http');
var Cookies = require('cookies');
var url = require('url');

http.createServer(function(req, res) {
    var query = url.parse(req.url, true).query;
    var cookies = new Cookies(req, res);

    if (query["forget"]) {
        var expireDate = new Date(1900, 1, 1);
        cookies.set('thing_to_remember', '', { 'expires': expireDate });
        res.writeHeader(302, {'Location':'/'});
        res.end();
        return;
    }
    
    if (query["remember"]) {
        cookies.set('thing_to_remember', query["remember"]);
        res.writeHeader(302, {'Location':'/'});        
        res.end();
        return; 
    }

    var message = '';
    if (cookies.get('thing_to_remember')) {
        message = 'Hello again! You asked me to remember: ' + cookies.get('thing_to_remember');
    }
    else {
        message = 'You have not asked me to remember anything yet. What shall I remember?';
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<html><body>' +
        message +
        '<form action="/" method="GET">' +
        '<input type="submit" name="forget" value="Forget everything" />' +
        '<input type="text" name="remember" value="" />' +
        '<input type="submit" value="Remember this" />' +
        '</form></body></html>');

}).listen(process.env.PORT);
```