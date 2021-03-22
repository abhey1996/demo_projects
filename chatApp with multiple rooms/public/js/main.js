const socket = io();
const chatForm = document.getElementById("chat-form")
const chatMessages = document.querySelector('.chat-messages')
const RoomName = document.getElementById('room-name')
const userList = document.getElementById('users')

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// console.log(username, room);
socket.emit('joinRoom', { username, room })

socket.on('message', message => {
    console.log(message)
    outputMessage(message)
    chatMessages.scrollTop = chatMessages.scrollHeight
})

socket.on('room-user', data => {
    outputRoomName(data.room)
    outputUsers(data.users)
})

chatForm.addEventListener('submit', event => {
    event.preventDefault();

    //get message entered in input
    const msg = event.target.elements.msg.value;

    //emit message to server
    socket.emit('chat-message', msg)

    //clear input after entering msg
    event.target.elements.msg.value = ''
    event.target.elements.msg.focus();

})

function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.message}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

function outputRoomName(room) {
    RoomName.innerText = room
}
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
}