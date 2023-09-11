

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, function() {
  console.log('listening on *:3000');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
    socket.on('typing', function() {
        io.emit('typing');
    });
    socket.on('stop typing', function() {
        io.emit('stop typing');
    });
    