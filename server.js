const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // لخدمة الملفات الثابتة (HTML, CSS, JS)

io.on('connection', (socket) => {
    console.log('عميل متصل');
    socket.on('send-message', (data) => {
        io.emit('receive-message', data);
    });

    socket.on('send-file', (fileData) => {
        io.emit('receive-file', fileData);
    });

    socket.on('disconnect', () => {
        console.log('عميل مفصول');
    });
});

module.exports = (req, res) => {
    server.listen(process.env.PORT || 3000, () => {
        console.log('الخادم يعمل على http://localhost:3000');
    });
};
