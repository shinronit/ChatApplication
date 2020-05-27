//Node server which will handle socket.io connections
const io = require ('socket.io')(8000)

const users = {}

io.on('connection',socket =>{
    socket.on('new-user-joined', name =>{
        console.log("New user : ", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined' , name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

var fs = require('fs'),
http = require('http');

http.createServer(function (req, res) {
  fs.readFile(__dirname + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080);