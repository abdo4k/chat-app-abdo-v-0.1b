const socket = io();

function startChat() {
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('name-container').style.display = 'none';
        document.getElementById('chat-box').style.display = 'block';
    } else {
        alert('يرجى إدخال اسمك');
    }
}

function sendMessage() {
    const message = document.getElementById('message-input').value;
    const username = document.getElementById('username').value;

    if (message) {
        socket.emit('send-message', { username, message });
        document.getElementById('message-input').value = ''; // مسح خانة الإدخال
    }
}

function sendFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            socket.emit('send-file', { username: document.getElementById('username').value, file: event.target.result, fileName: file.name });
        };
        reader.readAsDataURL(file);
    }
}

socket.on('receive-message', (data) => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${data.username}: ${data.message}`;
    document.getElementById('messages').appendChild(messageDiv);
});

socket.on('receive-file', (data) => {
    const fileDiv = document.createElement('div');
    const link = document.createElement('a');
    link.href = data.file;
    link.download = data.fileName;
    link.textContent = `${data.username} أرسل ملف: ${data.fileName}`;
    fileDiv.appendChild(link);
    document.getElementById('messages').appendChild(fileDiv);
});
