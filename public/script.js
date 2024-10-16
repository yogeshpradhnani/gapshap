const socket = io.connect('http://0.0.0.0:10000', { transports: ['websocket', 'polling'] });


const form = document.getElementById('send');
const messageInput = document.getElementById('msg');
const messageContainer = document.querySelector(".container");
var audio = new Audio('news-ting-6832.mp3')

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play()

    }



}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";


})
const name = prompt("Enter Name");

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined chat`, 'right')

})
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')

})
socket.on('left', name => {
    append(`${name} left the chat`, 'left')

})