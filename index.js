const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Enable CORS for all routes
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); 
app.set('view engine', 'ejs');
// Your Socket.IO setup
const io = require('socket.io')(server);

const PORT =  8000; // Port to listen on, defaults to 8000 if not specified in environment variables.  Note that this is a placeholder and should be replaced with your desired port.  Also, make sure to set up your server to listen on this port.  For example, using Node.js with Express: `app.listen(PORT, () => console.log('Server listening on port ${PORT}'));

// ... other server setup
app.get('*', (req, res) => {
    res.render(path.join(__dirname, 'public', 'index.html'));
});


server.listen(PORT, () => {
    console.log('Server listening on port 8000');
});
const users = {};
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        console.log(name);
        

    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    })
});