//This section requires all the necessary components that are neededfor the backend.
//Taken from documentation
//Udemy.com
const express = require('express');
const web = express();
const path = require('path');
const mongoose = require('mongoose');
const Account = require('./models/model');
const Order = require('./models/BlindModel');
const Booking = require('./models/BookingModel');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const methodOverride = require('method-override');
userUpdate = "";
userId = "";

//Connects to the Database
//Taken from documentation
//https://mongoosejs.com/
mongoose.connect('mongodb://localhost/UKblinds', { useNewUrlParser: true, useUnifiedTopology: true });

//Double checks the connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we are open")
});

//Sets up the middleware
//Partly from documentation
//Udemy.com
web.set('views', path.join(__dirname, 'views'));
web.set('view engine', 'ejs');

web.use(express.static(__dirname + '/views'));
web.use(express.urlencoded({ extended: true }));
web.use(session({ secret: 'secret' }));
web.use(methodOverride('_method'))

//Sets the pages with their corrosponding links
web.get('/Homepage', (req, res) => {
    userId = req.session.user_id;
    res.render('Homepage/Homepage', { userId })
})

web.get('/Blinds', (req, res) => {
    userId = req.session.user_id;
    res.render('Blinds/Blinds', { userId })
})

//Pass in the users details to the front-end
web.get('/Details', async(req, res) => {
    if (req.session.user_id) {
        const updateDet = await Account.findOne({ username: userUpdate })
        console.log(updateDet);
        res.render('Details/Details', { updateDet })
    } else {
        res.redirect(`/Login`)
    }
})

web.get('/Logout', (req, res) => {
    if (req.session.user_id) {
        res.render('Login/Logout')
    } else {
        res.redirect(`/Login`)
    }
})

web.get('/Login', (req, res) => {
    res.render('Login/Login')
})

//Passes into the front-end all the users orders
web.get('/PreviousOrder', async(req, res) => {

    if (req.session.user_id) {
        const orders = await Order.find({ username: userUpdate })
        res.render('PreviousOrder/PreviousOrder', { orders })
    } else {
        res.redirect(`/Login`)
    }
})

//Passes into the front-end all the users bookings
web.get('/PreviousBookings', async(req, res) => {
    if (req.session.user_id) {
        const booking = await Booking.find({ username: userUpdate })
        res.render('PreviousBookings/PreviousBookings', { booking })
    } else {
        res.redirect(`/Login`)
    }
})

web.get('/Curtains', (req, res) => {
    if (req.session.user_id) {
        res.render('Curtains/Curtains')
    } else {
        res.redirect(`/Login`)
    }

})

web.get('/Roller', (req, res) => {
    if (req.session.user_id) {
        res.render('Roller/Roller')
    } else {
        res.redirect(`/Login`)
    }
})

web.get('/Venetian', (req, res) => {
    if (req.session.user_id) {
        res.render('Venetian/Venetian')
    } else {
        res.redirect(`/Login`)
    }
})

web.get('/Vertical', (req, res) => {
    if (req.session.user_id) {
        res.render('Vertical/Vertical')
    } else {
        res.redirect(`/Login`)
    }
})

web.get('/Register', (req, res) => {
    res.render('Register/Register')
})

web.get('/Booking', async(req, res) => {
    if (req.session.user_id) {
        const updateDet = await Account.findOne({ username: userUpdate })
        console.log(updateDet);
        res.render('Booking/Booking', { updateDet })
    } else {
        res.redirect(`/Login`)
    }
})

//sets up an account for a user that has registered successfully
web.post('/Register', async(req, res) => {
    const { username, password, fullName, email, address, postcode, phoneNumber } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newAccount = new Account({ username, password: hash, fullName, email, address, postcode, phoneNumber });
    await newAccount.save();
    res.redirect(`/Homepage`);
})

//checks users inputed details to see if the account exists
web.post('/Login', async(req, res) => {
    const { username, password } = req.body;
    userUpdate = username;
    const account = await Account.findOne({ username });
    if (account) {
        const comparePassword = await bcrypt.compare(password, account.password);
        if (comparePassword) {
            req.session.user_id = account._id;
            res.redirect(`/Homepage`)
        } else {
            res.redirect(`/Login`)
        }
    } else {
        res.redirect(`/Login`)
    }
})

//session ID is set to Null therefore user logged out
web.post('/Logout', (req, res) => {
    req.session.user_id = null;
    res.redirect(`/Login`);
})

//Takes in user inputs from the front-end and stores in the order table
web.post('/Blind', async(req, res) => {
    const { type, length, width, colour, material } = req.body;
    const newOrder = new Order({ username: userUpdate, type, length, width, colour, material })
    await newOrder.save();
    res.redirect(`/Homepage`);
})

//Takes in user inputs from the front-end and stores in the bookings table
web.post('/Booking', async(req, res) => {
    const { date, time } = req.body;
    const newBooking = new Booking({ username: userUpdate, date, time });
    await newBooking.save();
    res.redirect(`/Homepage`)
})

//Takes in user inputs from the front-end and updates the users details in the backend
web.put('/Details', async(req, res) => {
    const { username, password, fullName, email, address, postcode, phoneNumber } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const details = await Account.findOneAndUpdate({ username: userUpdate }, { username, password: hash, fullName, email, address, postcode, phoneNumber }, { runValidators: true })
    res.redirect(`/Homepage`);
})

web.listen(3000, () => {
    console.log('listening on 3000');
})