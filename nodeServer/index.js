// Node server which will handle socket io connections 
const io = require('socket.io')(8000, {
    cors: {
      origin: 'http://127.0.0.1:5500',  // Add your client-side origin here
      methods: ['GET', 'POST'],
    },
  });
  
  const users = {};
  
  io.on('connection', socket => {     // if any new user joins let other user connected to the server now !
      socket.on('new-user-joined', name => {
          console.log("New user",name);  
          users[socket.id] = name;
          socket.broadcast.emit('user-joined', name);
      });

    // if someone send a message ,broadcast it to other people // 
      socket.on('send', message => {
          socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
      }); 

        // if someone leaves the chat,let other know //  
      socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id]; 
    });
});  
