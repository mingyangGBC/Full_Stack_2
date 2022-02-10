const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please enter your username'],
        trim: true
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        trim: true
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;