var express = require('express');
var path = require('path');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var arr =[];

io.on('connection', function(socket){
  // socket.broadcast.emit('broadcast');
  socket.on('name', function (name) {
     arr.push(name);
     console.log('msg');
     socket.broadcast.emit('broadcast', name+'joined');
     socket.broadcast.emit('arr', arr.join(','));
  });

  socket.on('chat message', function(msg){
    // console.log(msg);
    io.emit('chat message', msg)
  });
});
