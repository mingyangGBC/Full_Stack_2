const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    address:{
        building:{
            type: Number,
            trim: true
        },
        street:{
            type: String,
            required: true,
            trim: true
        },
        zipcode:{
            type: String,
            trim: true
        }
    },
    city:{
        type: String,
        required: true,
        trim: true
    },
    cuisine:{
        type: String,
        required: true,
        trim: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    restaurant_id:{
        type: Number,
        required: true,
        trim: true
    }
})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;