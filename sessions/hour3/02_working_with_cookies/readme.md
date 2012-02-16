Working with Cookies:
=====================

Cookies are small and delicious pieces of data that web browsers store for web applications. Cookies are a key part of any web application, without them, you would have to log-in to a web application every time you visited it and URLs would look really ugly.

Think of it this way: Without cookies, you would have no way of knowing if someone had already loaded your application and it would be really hard to keep track of what their last action was.

Below is a full-featured Node application that demonstrates how set cookies, how to delete them and how to access cookies you've set previously.

Don't worry about understanding everything just yet, we'll be explaing what were doing below.


```JavaScript
var http = require('http');
var Cookies = require('cookies');
var url = require('url');

http.createServer(function(req, res) {
    var query = url.parse(req.url, true).query;
    var cookies = new Cookies(req, res);

    if (query["remember"]) {
        cookies.set('thing_to_remember', query["remember"]);
        res.writeHeader(302, {'Location':'/'});        
        res.end();
        return; 
    }

    if (query["forget"]) {
        var expireDate = new Date(1900, 1, 1);
        cookies.set('thing_to_remember', '', { 'expires': expireDate });
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

Not terribly complicated, right? We can thank the [cookies module](https://github.com/jed/cookies) for that!

The way that you actually set a cookie is via a HTTP header. We could have done this with a .writeHeader or .addHeader method. But there's some nuance to doing that correctly and the cookies module takes care of that for us.

Don't forget! To use the cookies module, you'll have to run ''npm install cookies''.

Alright, lets look at some of the key parts in the code above.


You need to initialize a new cookies object with your request and response objects. Like so:
```JavaScript
    var cookies = new Cookies(req, res);
```

The ''query'' object contains all the GET paramaters that were present in the URL we are handling. If there is a ''remember'' paramater, it means that you typed something in the text box and clicked the "Remember this" button.

Next, we set a cookie with the name of "thing_to_remember" and set the value to the thing you typed in the text box.

When we're done, we redirect you back to the "root" URL. This is done so that you can see that we really are saving this data in your browser and not in the URL!

```JavaScript
    if (query["remember"]) {
        cookies.set('thing_to_remember', query["remember"]);
        res.writeHeader(302, {'Location':'/'});        
        res.end();
        return; 
    }
```

If there is a ''forget'' paramater, it means you clicked the "Forget Everything" button.

To delete a cookie, we must set another cookie with the same name as the one we want to delete, except with an expiration date in the past.

When we're done "deleting" the cookie, we redirect you back to the "root" URL. Like before, this is done so that you can see that we really are deleting this data and not just faking it.

```JavaScript
    if (query["forget"]) {
        var expireDate = new Date(1900, 1, 1);
        cookies.set('thing_to_remember', '', { 'expires': expireDate });
        res.writeHeader(302, {'Location':'/'});
        res.end();
        return;
    }
```

Finally, if we weren't setting or deleting a cookie. That means we want to see what's in the cookie. To do that, we use the .get() method on the cookie object:
```JavaScript
cookies.get('thing_to_remember')
```

