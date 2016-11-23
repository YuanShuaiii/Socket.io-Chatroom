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

io.on('connection', function(socket){


  // socket.broadcast.emit('broadcast');
  socket.on('name', function (name) {
      socket.name = name;
     arr.push(name);
     console.log('msg');
     socket.broadcast.emit('broadcast', name+'joined');
     socket.emit('arr', arr.join(','));
     socket.broadcast.emit('arr', arr.join(','));
  });


  socket.on('chat message', function(msg){
    // console.log(msg);
    io.emit('chat message', msg)
  });



  socket.on('disconnect', function () {
      var  delName = socket.name;
      for (var i = 0; i < arr.length; i++) {
          var nameTemp = arr[i];
          if(nameTemp==delName){
              arr.splice(i,1)
          }

      }
      // arr.remove();
      socket.broadcast.emit('broadcast', socket.name + 'leaved');
      socket.broadcast.emit('arr', arr.join(','));
      // socket.broadcast.emit('arr', arr.join(','));
  })
});


