const PORT = process.env.PORT || 5000;
const INDEX = '/index.html';

var express = require('express');
const socketIO = require('socket.io');
var path = require('path');

const server = express()
//   .use((req, res) => res.sendFile("/public/" + INDEX, { root: __dirname }))
.use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

//Node server which will handle socket.io connections
const io = socketIO(server);

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

