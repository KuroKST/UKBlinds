//Allows the use of mongoose 
const mongoose = require('mongoose');

//Sets up the schema and what can be taken in by the schema
const bookingSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    }
})

//Makes a new model based on the given schema
const Booking = mongoose.model('Booking', bookingSchema);

//Exports the model to be used in another file
module.exports = Booking;