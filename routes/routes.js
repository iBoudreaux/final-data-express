const {response} = require('express');
const mongoose = require('mongoose');

//Database stuff

const connString = 'mongodb://127.0.0.1/data';
mongoose.connect(connString, {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB Connection Error'));

db.once('open', callback => {});

//property/attribute - value schema for database
let userDataSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    answer1: String,
    answer2: String,
    answer3: String
});

let User = mongoose.model('Data_Collection', userDataSchema);

exports.index = (req, res) => {
    res.render ('index', {
        title: 'Home Page'
    });
}

//render for create acc form
exports.create = (req, res) => {
    res.render ('create', {
        title: 'Create an Account'
    });
}

//creating record/Account
exports.createAcc = (req, res) => {
    let ageNum = Number(req.body.age);
    let account = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: ageNum,
        answer1: req.body.ans1,
        answer2: req.body.ans2,
        answer3: req.body.ans3
    });

    account.save()
        .then((account) => {
            console.log(account);
            res.send('Account made');
        })
        .catch((err) => {
            console.log(err);
            res.send('Error creating account');
        });
}

//retrieving record/Account

//render for loggedin user
exports.loggedin = (req, res) => {
    res.render ('loggedin', {
        title: 'Logged in User',
    });
}