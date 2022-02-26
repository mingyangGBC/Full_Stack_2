const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,

  },
  firstname: {
    type: String,
    required: true
  },

  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength:6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  type: {
    type: String,
    required: [true]
  }

  
});

module.exports = mongoose.model('User', UserSchema);