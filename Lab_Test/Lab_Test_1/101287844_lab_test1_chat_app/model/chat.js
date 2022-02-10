const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    "from": {
        type: String,
        required: true
    },
    "room": {
        type: String,
        required: true
    },
    "message": {
        type: String,
        required: true
    },
    "date": {
        type: String,
        required: true
    }
})

module.exports = mongoose.model(`Chat`, ChatSchema)