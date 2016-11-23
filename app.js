var express = require('express');
var path = require('path');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3001);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var arr =[];
var soc = [];

io.on('connection', function(socket){
    socket.on('name', function (name) {
        socket.name = name;
        soc.push(socket);
        arr.push(name);
        socket.broadcast.emit('broadcast', name+'joined');
        socket.emit('arr', arr.join(','));
        socket.broadcast.emit('arr', arr.join(','));
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg)
    });


    //private
    socket.on('pre', function (msg) {
        soc.forEach(function (so) {
            if(msg.name == so.name){
                so.emit('to',socket.name + "[私密]:" + msg.data);
            }
        })
    });


    //disconnect
    socket.on('disconnect', function () {
        var  delName = socket.name;
        for (var i = 0; i < arr.length; i++) {
            var nameTemp = arr[i];
            if(nameTemp==delName){
                arr.splice(i,1)
            }
        }
      socket.broadcast.emit('broadcast', socket.name + 'leaved');
      socket.broadcast.emit('arr', arr.join(','));
  });
});


