const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UsersRoutes.js')
const app = express();
const cors = require('cors')
const http = require('http').createServer(app)
const moment = require(`moment`)
const chatModel = require('./model/chat')

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}))

const users = [];

function userJoin(id, username, room) {
    const user = { id, username, room }
    users.push(user)
    return user
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format(`MM-DD-YYYY h:m a`)
    }
}

const io = require('socket.io')(http)
const roomName = "Chat App"
io.on(`connection`,
    (socket) => {
        socket.on(`joinRoom`, ({ username, room }) => {
            const user = userJoin(socket.id, username, room)
            socket.join(user.room)
            socket.emit(`message`, formatMessage(roomName, ` You are connected`))

            socket.broadcast.to(user.room).emit(`message`, formatMessage(roomName, ` ${user.username} has joined the chat`))
            io.to(user.room).emit(`roomUsers`, {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        })

        
        socket.on(`isTyping`, (status) => {
            const user = getCurrentUser(socket.id);
            socket.broadcast.to(user.room).emit(`typingStat`, status)
        })

        socket.on(`chatMessage`, (message) => {
            const user = getCurrentUser(socket.id);

            io.to(user.room).emit('message', formatMessage(user.username, message))

            const chat = new chatModel({
                "from": `${user.username}`,
                "room": `${user.room}`,
                "message": `${message}`,
                "date": `${moment().format(`MM-DD-YYYY h:m a`)}`
            })
            try {
                chat.save()
            } catch (err) {
                res.status(500).send(err);
            }
        })
        

        socket.on(`disconnect`, () => {
            const user = userLeave(socket.id)
            if (user) {
                io.to(user.room).emit(`message`, formatMessage(roomName, `${user.username} has left the chat`))
                io.to(user.room).emit(`roomUsers`, {
                    room: user.room,
                    users: getRoomUsers(user.room)
                })
            }

        })
    })

mongoose.connect('mongodb+srv://mingyang:199537@cluster0.qkise.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use(userRouter);

http.listen(8081, () => { console.log('Server is running...') });