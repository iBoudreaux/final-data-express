const {response} = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

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
            res.send('Account made successfully.');
        })
        .catch((err) => {
            console.log(err);
            res.send('Error creating account');
        });
}

exports.create = (req, res) => {
    res.render('create', {
        title: 'Create Account'

    });

}

exports.login = (req, res) => {
    res.render ('login', {
        title: 'Login into Account'
    });
}

exports.loginCheck = async (req, res) => {
    let usernameStr = req.body.username;
    let passwordStr = req.body.password;

    var userFound =  await User.findOne()
    .where("username")
    .equals(usernameStr)
    .where("password")
    .equals(passwordStr)
    .select("username email age password answer1 answer2 answer3")
    .then((account) => {
        console.log(userFound);
        
        res.redirect(`/profile/${account.username}`);
        
    })
    .catch((err) => {
        console.log(err);
        res.render("login", {
            errorMsg: 'Username and/or password is incorrect.'
            
        });
    });
}


exports.profile = async (req, res) => {
    var param = req.params.userP;

    var userFound =  await User.findOne()
    .where("username")
    .equals(param)
    .select("username email")
    .then((user) => {
        res.render('profile', {
            username: user.username,
            email: user.email
        })
    })
    

}

exports.edit = (req, res) => {
    res.render ('edit', {
        title: 'Edit Your Account'
    });
}

exports.delete = (req, res) => {
    res.render ('delete', {
        title: 'Delete Account'
    });
}