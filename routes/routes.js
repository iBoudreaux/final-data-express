const {response} = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

//Database stuff

const connString = 'mongodb://127.0.0.1/data';
mongoose.connect(connString, {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB Connection Error'));

db.once('open', callback => {});

//property - value schema for database
let userDataSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    answer1: String,
    answer2: String,
    answer3: String
});

//Model
let User = mongoose.model('Data_Collection', userDataSchema);


//Views
exports.index = (req, res) => {
    var session = req.session;
    session.userid = session.userid;
    if(session.userid){
        req.session.destroy();
        res.redirect('/');

    } else {
        res.render ('index', {
            title: 'Home Page'
        });
    }
    
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

    //Question 1
    const ponies = {
        twilight,
        applejack,
        rainbowdash,
        fluttershy,
        pinkiepie
    } = req.body;

    //Question 2
    const cutiemarks = {
        twilights,
        applejacks,
        fluttershys,
        pinkies
    } = req.body;

    //Question 3
    const opponents = {
        twilight, 
        goku
    } = req.body;

    let account = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: ageNum,
        answer1: ponies.select1,
        answer2: cutiemarks.select2,
        answer3: opponents.select3
    });

    account.save()
        .then((account) => {
            console.log(account);
            res.redirect("/login")
            
        })
        .catch((err) => {
            console.log(err);
            res.send('Error creating account');
        });
}

exports.login = (req, res) => {
    res.render ('login', {
        title: 'Login into Account'
    });
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
            session = req.session;
            session.userid = usernameStr;
            console.log(req.session);

            res.render('profile', {
                username: userF.username,
                email: userF.email,
                password: userF.password,
                age: userF.age,
                ans1: userF.answer1,
                ans2: userF.answer2,
                ans3: userF.answer3
                
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

//GET Route for User Prof
exports.getProf = (req, res) => {
    var session = req.session;
        session.userid = session.userid;
        if (session.userid){
            User.findOne({username: session.userid})
            .then((userF) => {
                res.render('profile', {
                    username: userF.username,
                    email: userF.email,
                    password: userF.password,
                    age: userF.age,
                    ans1: userF.answer1,
                    ans2: userF.answer2,
                    ans3: userF.answer3
                    
                })
            })
        } else {
            res.send("You don't have access to this.")
        }
}

//GET Route
exports.edit = async (req, res) => {
    var session = req.session;
    session.userid = session.userid;
    if(session.userid){
        User.findOne({username: session.userid})
        .then((userfound) => {
            res.render('edit', {
                usernameVal: userfound.username,
                passVal: userfound.password,
                emailVal: userfound.email,
                ageVal: userfound.age   
            })
        })
        
    } else{
        res.send("You do not have acess to this");
    }
    
    
}

exports.editProf = async (req, res) => {
        try{
            var session = req.session;
            session.userid = session.userid;

            if(session.userid){
                let usernameStr = req.body.username;
                let emailStr = req.body.email;
                let passwordStr = req.body.password;
                let ageStr = req.body.age;
                
                //Question 1
                const ponies = {
                    twilight,
                    applejack,
                    rainbowdash,
                    fluttershy,
                    pinkiepie
                } = req.body;

                //Question 2
                const cutiemarks = {
                    twilights,
                    applejacks,
                    fluttershys,
                    pinkies
                } = req.body;

                //Question 3
                const opponents = {
                    twilight, 
                    goku
                } = req.body;

                console.log(ponies.select1);
                console.log(cutiemarks.select2);
                console.log(opponents.select3);

                let doc = await User.findOneAndUpdate({username: session.userid}, 
                    {email: emailStr, password: passwordStr, age: ageStr, 
                        answer1: ponies.select1, answer2: cutiemarks.select2,
                        answer3: opponents.select3});
                    doc = await User.findOne({username: usernameStr})
                    
                res.render ('edit', {
                    usernameVal: doc.username,
                    passVal: doc.password,
                    emailVal: doc.email,
                    ageVal: doc.age            
                });
            } else {
                res.send('You do not have access to this');
            }
        } catch(error){
            console.log(error);
        }
    }

//GET delete pug render
exports.delete = (req, res) => {
    var session = req.session;
    session.userid = session.userid;
    if(session.userid){
        res.render("delete", {
            usernameTxt: session.userid
        })
    } else {
        res.send("You don't have access to this.");
    }
    
}

//POST delete logic
exports.deleteProf = async (req, res) => {
    try {
        var session = req.session;
        session.userid = session.userid;
        if(session.userid){
            await User.findOneAndDelete({username: session.userid});
            console.log("Successfully deleted account");
            req.session.destroy();
    
            res.redirect('/');
        } else {
            res.send("You don't have access to this.");
        }
        
    
    } catch (error) {
        console.log(error);
    }
}

//Logout
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

//API 

// routes.getAPI = (req, res) =>{
    
// }