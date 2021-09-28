//Allows the use of mongoose 
const mongoose = require('mongoose');

//Sets up the schema and what can be taken in by the schema
const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    postcode: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    }
})

//Makes a new model based on the given schema
const Account = mongoose.model('Account', accountSchema);

//Exports the model to be used in another file
module.exports = Account;