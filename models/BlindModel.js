//Allows the use of mongoose 
const mongoose = require('mongoose');

//Sets up the schema and what can be taken in by the schema
const orderSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    width: {
        type: Number,
        require: true
    },
    length: {
        type: Number,
        require: true
    },
    colour: {
        type: String,
        require: true
    },
    material: {
        type: String,
        require: true
    }
})

//Makes a new model based on the given schema
const Order = mongoose.model('Order', orderSchema);

//Exports the model to be used in another file
module.exports = Order;