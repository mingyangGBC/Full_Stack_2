const mongoose = require('mongoose');

const PrivatChatSchema = mongoose.Schema({
    "from": {
        type: String,
        required: true
    },
    "to": {
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

module.exports = mongoose.model('PrivateChat', PrivatChatSchema)