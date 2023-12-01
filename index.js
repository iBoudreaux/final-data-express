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

    app.get('/', routes.index);
    //Views
    app.get('/create', routes.create);
    //app.post('/loggedin', urlencodedParser, routes.loggedin);

     //Account
     app.post('/create/Account', urlencodedParser, routes.createAcc);
    


    //API
    app.listen(3000);