const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    bodyParser = require('body-parser'),
    routes = require('./routes/routes'),
    session = require('express-session'),
    cookieParser = require('cookie-parser');

    const urlencodedParser = bodyParser.urlencoded({extended: true});

    const app = express();

    //View Engine and Paths
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));

    //body parser
    app.use(express.urlencoded({ extended: true} ));
    app.use(express.json());

    //session for keeping track of user
    app.use(
        session({
            secret: 'ponyfan',
            resave: false,
            saveUninitialized: true
        })
    );

    //parsing the cookie for the session
    app.use(cookieParser());

    //Views
    app.get('/', routes.index);
    app.get('/create', routes.create);
    app.get('/login', routes.login);
    app.get('/edit', routes.edit);
    app.get('/delete', routes.delete);
    app.get('/logout', routes.logout);
    app.get('/profile', routes.getProf);
    //Account Creation/Audit
    app.post('/create/Account', urlencodedParser, routes.createAcc);
    app.post('/userprof', urlencodedParser, routes.userProf);
    app.post('/editprof', urlencodedParser, routes.editProf);
    app.post('/deleteprof', urlencodedParser, routes.deleteProf);
    

    //API
    // app.post('/api', routes.getAPI);

    app.listen(3000);