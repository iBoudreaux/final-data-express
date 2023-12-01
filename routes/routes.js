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

exports.login = (req, res) => {
    res.render ('login', {
        title: 'Login into Account'
    });
}

exports.profile = (req, res) => {
    res.render ('profile', {
        title: 'Users Account'
    });
}

exports.edit = (req, res) => {
    res.render ('edit', {
        title: 'Edit Questions Account'
    });
}

exports.delete = (req, res) => {
    res.render ('delete', {
        title: 'Delete Account'
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
exports.getUser = (req, res) => {
    Account.find({})
}


//render for loggedin user
exports.login = (req, res) => {
    res.render ('login', {
        title: "Log in"
    })
}

exports.loggedin = async (req, res) => {
    let usernameStr = req.body.username;
    let passwordStr = req.body.password;

    User.findOne()
    .where("username")
    .equals(usernameStr)
    .where("password")
    .equals(passwordStr)
    .select("username")
    .then((account) => {
        console.log(account);
        res.send(`Welcome, ${account.username}!`)
    })
    .catch((err) => {
        console.log(err);
        res.render("login", {
            errorMsg: 'Username and/or password is incorect.'
        })
    });

    
    
}

exports.edit = (req, res) => {
    res.render ('edit', {
        title: 'Edit Your Account'
    })
}
