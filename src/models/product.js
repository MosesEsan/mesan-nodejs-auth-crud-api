const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Product name is required',
        trim: true
    },

    category: {
        type: String,
        required: 'Product category is required',
    },

    description: {
        type: String,
        required: false
    },

    quantity: {
        type: Number,
        required: 'Product quantity is required',
        max: 100
    },

    cost: {
        type: Number,
        required: 'Product cost is required',
        max: 100
    },

    price: {
        type: Number,
        required: 'Selling price is required',
        max: 100
    },

    image: {
        type: String,
        required: false,
        max: 255
    }

}, {timestamps: true});


module.exports = mongoose.model('Users', UserSchema);