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

// بدلاً من استخدام `server.listen`, نستخدم التصدير المباشر
module.exports = (req, res) => {
    server.emit('request', req, res);
};
