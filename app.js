const express = require('express');
const bodyParser = require('body-parser');
const Token = require('./methods/token');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

app.post('/check', (req, res, next) => {
    t = new Token(req.body.first);

    console.log(t.tokenType);
    res.redirect('/');
});

app.use((req, res, next) => {
    res.render('main');
});

app.listen(3000);