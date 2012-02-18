var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');

var app = http.createServer(requestCallback);
var io = socketio.listen(app);

app.listen(process.env.PORT || 80);

function requestCallback(req, res) {
    fs.readFile(__dirname + '/index2.html', function (err, data) {
        if (err) {
            res.writeHead(404);
            return res.end('Error loading index');
        }

        res.writeHead(200);
        res.end(data);
    });
}

var chat = io.of('/chat').on('connection', function (socket) {
    socket.emit('a message', {
        to: 'the connecting user'
    });
    chat.emit('a message', {
        to: 'everyone'
    });
});