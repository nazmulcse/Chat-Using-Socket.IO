var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];
server.listen(process.env.PORT || 3000);
app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});
io.sockets.on('connection',function(socket){
  connections.push(socket);
  console.log('Connceted: %s socket connected',connections.length);

  //Disconnected
  socket.on('disconnect',function(data){
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnected : %s socket connected',connections.length);
  });
  socket.on('send message',function(data){
    console.log(data)
    io.sockets.emit('new message',{msg:data});
  });
});
