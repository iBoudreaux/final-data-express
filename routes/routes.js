const {response} = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const bcryptjs = require('bcryptjs');

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
exports.index = async (req, res) => {

    let allRec =  await User.find({}).countDocuments();

    //API Call
    let url = `http://localhost:3000/api`;
    await axios.get(url)
    .then(axios_res => {      
        
        //gathering data into vars
        //Q1
        let twiVal = axios_res.data.data.question_1.twilight;
        let appVal = axios_res.data.data.question_1.applejack;
        let rainbVal = axios_res.data.data.question_1.rainbowdash;
        let rarVal = axios_res.data.data.question_1.rarity;
        let flutterVal = axios_res.data.data.question_1.fluttershy;
        let pinkVal = axios_res.data.data.question_1.pinkiepie;


        //Q2
        let cuteTwi = axios_res.data.data.question_2.twilights;
        let cuteApp = axios_res.data.data.question_2.applejacks;
        let cuteRain = axios_res.data.data.question_2.rainbowdashs;
        let cuteRar = axios_res.data.data.question_2.raritys;
        let cuteFlutt = axios_res.data.data.question_2.fluttershys;
        let cutePink = axios_res.data.data.question_2.pinkiepies;

        //Q3
        let twiWinner = axios_res.data.data.question_3.twilight;
        let gokuWinner = axios_res.data.data.question_3.goku;

        //Quick Mafs
        //fav pony
        twiVal = Math.round((100 * twiVal) / allRec);
        appVal = Math.round((100 * appVal) / allRec);
        rainbVal = Math.round((100 * rainbVal) /allRec);
        rarVal = Math.round((100 * rarVal) / allRec);
        flutterVal = Math.round((100 * flutterVal) / allRec);
        pinkVal = Math.round((100 * pinkVal) / allRec);

        //cutiemark
        cuteTwi = Math.round((100 * cuteTwi) / allRec);
        cuteApp = Math.round((100 * cuteApp) / allRec);
        cuteRain = Math.round((100 * cuteRain) / allRec);
        cuteRar = Math.round((100 * cuteRar) / allRec);
        cuteFlutt = Math.round((100 * cuteFlutt) / allRec);
        cutePink = Math.round((100 * cutePink) / allRec);

        //Versus
        twiWinner = Math.round((100 * twiWinner) / allRec);
        gokuWinner = Math.round((100 * gokuWinner) / allRec);

        res.render('index', {
            twilightVal: `${twiVal}%`,
            appleVal: `${appVal}%`,
            rainVal: `${rainbVal}%`,
            rarityVal: `${rarVal}%`,
            flutVal: `${flutterVal}%`,
            pinkieVal: `${pinkVal}%`,
            twiCuteVal: `${cuteTwi}%`,
            appCuteVal: `${cuteApp}%`,
            rainCuteVal: `${cuteRain}%`,
            rarCuteVal: `${cuteRar}%`,
            flutCuteVal: `${cuteFlutt}%`,
            pinkieCuteVal: `${cutePink}%`,
            twiWin: `${twiWinner}%`,
            gokuWin: `${gokuWinner}%`
        })  
    })
}

//render for create acc form
exports.create = (req, res) => {
    res.render ('create', {
        title: 'Create an Account'
    });
}

//creating record/Account
exports.createAcc = async (req, res) => {
    let ageNum = Number(req.body.age);
    let saltRounds = 1;
    //Question 1
    const ponies = {
        twilight,
        applejack,
        rainbowdash,
        rarity,
        fluttershy,
        pinkie
    } = req.body;

    //Question 2
    const cutiemarks = {
        twilights,
        applejacks,
        rainbowdashs,
        raritys,
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
        //password hashing
        password: await bcryptjs.hash(req.body.password, saltRounds),
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

        
        
        User.findOne({username: usernameStr})
        .then(async (userF) => {
            console.log(userF);
            session = req.session;
            session.userid = usernameStr;
            let hashedPass = userF.password;

            if(await bcryptjs.compare(passwordStr, hashedPass) == true ){
                res.render('profile', {
                    username: userF.username,
                    email: userF.email,
                    password: '******',
                    age: userF.age,
                    ans1: userF.answer1,
                    ans2: userF.answer2,
                    ans3: userF.answer3
                    
                })
            }
            
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
                    password: '******',
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

//GET Route for Edit Render
exports.edit = async (req, res) => {
    var session = req.session;
    session.userid = session.userid;
    if(session.userid){
        User.findOne({username: session.userid})
        .then((userfound) => {
            res.render('edit', {
                usernameVal: userfound.username,
                passVal: '******',
                emailVal: userfound.email,
                ageVal: userfound.age   
            })
        })
        
    } else{
        res.send("You do not have acess to this.");
    }
    
    
}

//POST vRoute for Edit Logic/Render
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
                    rarity,
                    fluttershy,
                    pinkiepie
                } = req.body;

                //Question 2
                const cutiemarks = {
                    twilights,
                    applejacks,
                    rainbowdashs,
                    raritys,
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

                let saltRounds = 1;
                let hashedPass = await bcryptjs.hash(passwordStr, saltRounds);

                let doc = await User.findOneAndUpdate({username: session.userid}, 
                    {email: emailStr, password: hashedPass, age: ageStr, 
                        answer1: ponies.select1, answer2: cutiemarks.select2,
                        answer3: opponents.select3});
                    doc = await User.findOne({username: usernameStr})
                    
                res.render ('edit', {
                    usernameVal: doc.username,
                    passVal: '******',
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

//POST delete logic/render
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

exports.getAPI = async (req, res) =>{

    //Question 1 
    let ans1counTwi =  await User.find({}).where('answer1').equals('twilight').countDocuments();
    let ans1counApp =  await User.find({}).where('answer1').equals('applejack').countDocuments();
    let ans1counRain =  await User.find({}).where('answer1').equals('rainbowdash').countDocuments();
    let ans1counRar =  await User.find({}).where('answer1').equals('rarity').countDocuments();
    let ans1counFlutt =  await User.find({}).where('answer1').equals('fluttershy').countDocuments();
    let ans1counPink =  await User.find({}).where('answer1').equals('pinkie').countDocuments();

    //Question 2
    let ans2counTwi =  await User.find({}).where('answer2').equals('twilights').countDocuments();
    let ans2counApp =  await User.find({}).where('answer2').equals('applejacks').countDocuments();
    let ans2counRain =  await User.find({}).where('answer2').equals('rainbowdashs').countDocuments();
    let ans2counRar =  await User.find({}).where('answer2').equals('raritys').countDocuments();
    let ans2counFlutt =  await User.find({}).where('answer2').equals('fluttershys').countDocuments();
    let ans2counPink =  await User.find({}).where('answer2').equals('pinkies').countDocuments();

    //Question 3
    let ans3counTwi =  await User.find({}).where('answer3').equals('twilight').countDocuments();
    let ans3counGoku =  await User.find({}).where('answer3').equals('goku').countDocuments();


        console.log(ans1counTwi);
        console.log(ans1counApp);

        res.json({
            data: {
                
                    question_1: {
                        twilight: ans1counTwi,
                        applejack: ans1counApp,
                        rainbowdash: ans1counRain,
                        rarity: ans1counRar,
                        fluttershy: ans1counFlutt,
                        pinkiepie: ans1counPink
                    }
                    
                ,

                
                    question_2: {
                        twilights: ans2counTwi,
                        applejacks: ans2counApp,
                        rainbowdashs: ans2counRain,
                        raritys: ans2counRar,
                        fluttershys: ans2counFlutt,
                        pinkiepies: ans2counPink
                    }
                ,

                
                    question_3: {
                        twilight: ans3counTwi,
                        goku: ans3counGoku
                    }
                

            }
        })
}