var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');

var app = http.createServer(requestCallback);
var io = socketio.listen(app);

app.listen(process.env.PORT || 80);

function requestCallback(req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(404);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});