const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatDate = require('./utils/messages')
const { userJoin, findUser, leaveUser, getRoomUsers } = require('./utils/user')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

//static folder
app.use(express.static(path.join(__dirname, 'public')))

//new connection
io.on('connection', socket => {
    console.log("new connection..")
    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room)

        socket.join(user.room)

        socket.emit('message', formatDate('Chatbot', 'Welcome to Chat'))

        socket.broadcast.to(user.room).emit('message', formatDate('Chatbot', `${user.username} has joined`))

        io.to(user.room).emit('room-user', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    socket.on('chat-message', message => {
        const user = findUser(socket.id)
        io.to(user.room).emit('message', formatDate(user.username, message))
    })

    socket.on('disconnect', () => {
        const user = leaveUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', formatDate('Chatbot', `${user.username} has left the chat`))

            io.to(user.room).emit('room-user', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })

})

server.listen(3000, () => {
    console.log("server running")
})