
const mongoose = require('mongoose')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new mongoose.Schema({
    
    username:{
        type: String,
        required: true,
        minlength: 4
    },
    email:{
        type: String,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    website:{
        type: String,
        required: true,
        web: mongoose.SchemaTypes.Url
    },
    address:{
        city:{
            type: String,
            required: true,
            validate:{
                validator: function (val) {
                    return validator.isAlpha(val, ['en-GB'], {
                    ignore: ' ',
                    });
            }
        },
        zipcode:{
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                  return /\d{5}-\d{4}/.test(v);
                },
                message: props => `${props.value} is not a valid Zip Code!`
              },
        }
    }
    ,
    phone:{
        type: String,
        required: true,
        validate: {
            validator: function(v) {
              return /\d{1}-\d{3}-\d{3}-\d{3}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
    }

}})

const User = mongoose.model('User', UserSchema)
module.exports = User