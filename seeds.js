//This file sets an account into the database beforehand

//allows the use of the necesary dependencies
const mongoose = require('mongoose');
const Account = require('./models/model');
const bcrypt = require('bcryptjs');

//Coneects to the database
mongoose.connect('mongodb://localhost/UKblinds', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we are open")
});

//Hashes the password
const hash = bcrypt.hash('hello', 10);

//Sets the account using the account model
const testing = new Account({
    username: 'jack1234',
    password: hash,
    fullname: 'Jack Joy',
    email: 'jack@123.com',
    address: '1234 hoodlane road',
    postcode: 'u62 8kp',
    phoneNumber: '09876543211'
})

//saves the account to the database
testing.save()
    .then(testing => {
        console.log(testing);
    })
    .catch(err => {
        console.log(err);
    })