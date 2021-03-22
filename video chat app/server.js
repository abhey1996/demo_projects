const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set("view engine", "ejs")
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:roomid', (req, res) => {
    res.render('room', { roomid: req.params.roomid })
})

io.on('connection', socket => {
    socket.on('join-room', (roomid, userid) => {
        socket.join(roomid)
        socket.to(roomid).broadcast.emit('user-connected', userid)

        socket.on('disconnect', () => {
            socket.to(roomid).broadcast.emit('user-disconnected', userid)
        })
    })
})

server.listen(3000, () => {
    console.log("server running")
})
