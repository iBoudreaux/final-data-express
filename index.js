const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    bodyParser = require('body-parser'),
    routes = require('./routes/routes');

    const urlencodedParser = bodyParser.urlencoded({extended: true});

    const app = express();

    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));

    //Views
    app.get('/', routes.index);
    app.get('/create', routes.create);
    app.get('/login', routes.login);
    app.get('/profile/:userP', routes.profile);
    app.get('/profile', routes.profile);
    app.get('/edit', routes.edit);
    app.get('/delete', routes.delete);

     //Account
    app.post('/create/Account', urlencodedParser, routes.createAcc);
    app.post('/profile/login', urlencodedParser, routes.loginCheck);
    app.post('/edit/prof', urlencodedParser, routes.edit);



    //API

    app.listen(3000);