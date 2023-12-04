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

//Checks user login
exports.loginCheck = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(`Name: ${username} Pass: ${password}`)
    res.render('login', {

    })
}

//POST Route
exports.userProf = async (req, res) => {
    try {
        let usernameStr = req.body.username;
        let passwordStr = req.body.password;
        
        console.log(`Name: ${usernameStr} Pass: ${passwordStr}`);

        User.findOne({username: usernameStr, password: passwordStr})
        .then((userF) => {
            console.log(userF);
            res.render('profile', {
                username: userF.username,
                email: userF.email
            })
        })
        .catch((error) =>{
            res.render('login',{
                errorMsg: 'Username/password incorrect.'
            })
        })
        

    } catch (error) {
        console.log(error);
    }
    
}

//GET Route
exports.edit = async (req, res) => {

    res.render('edit', {

    })
    
}

exports.editProf = async (req, res) => {
    try{
        let usernameStr = req.body.username;
        let emailStr = req.body.email;
        let passwordStr = req.body.password;
        let ageStr = req.body.age;
        
        let doc = await User.findOneAndUpdate({username: usernameStr}, 
            {email: emailStr, password: passwordStr, age: ageStr});
            doc = await User.findOne({username: usernameStr})
            
        res.render ('edit', {
            usernameVal: doc.username,
            passVal: doc.password,
            emailVal: doc.email,
            ageVal: doc.age
            
        });
    } catch(error){
        console.log(error);
    }
}

//GET delete pug render
exports.delete = (req, res) => {
    res.render("delete", {
        title: "Delete Account"
    })
}

//POST delete logic
exports.deleteProf = async (req, res) => {
    try {
        let usernameStr = req.body.username;
        await User.findOneAndDelete({username: usernameStr});
        console.log("Successfully deleted account");

        res.redirect('/');
    
    } catch (error) {
        console.log(error);
    }
}
