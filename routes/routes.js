const {response} = require('express');
const mongoose = require('mongoose');

const connString = 'mongodb://127.0.0.1/data';
mongoose.connect(connString, {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB Connection Error'));

db.once('open', callback => {});

let userDataSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    answer1: String,
    answer2: String,
    answer3: String
});

let Data = mongoose.model('Data_Collection', userDataSchema);

exports.index = (req, res) => {
    res.render ('index', {
        title: 'Home Page'
    });
}

exports.create = (req, res) => {
    res.render ('create', {
        title: 'Create an Account'
    });
}

exports.loggedin = (req, res) => {
    res.render ('loggedin', {
        title: 'Logged in User',
    });
}