// 1. Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// 2. Create express app
const app = express();

// 3. Create HTTP server
const server = http.createServer(app);

// 4. Create Socket.IO instance
const io = new Server(server);

// 5. Define PORT
const PORT = process.env.PORT || 4000;

// 6. Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 7. Handle socket connections
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message',(msg)=>{
        io.emit('chat message',msg);
    })
});

// 8. Start server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
