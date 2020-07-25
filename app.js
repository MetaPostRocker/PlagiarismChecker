const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const parse = require('./methods/parser');
const levenshtein = require('./methods/algo').levenshtein;
const wShingling = require('./methods/algo').wShingling;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', (req, res, next) => {
    if (req.body.first == '' || req.body.second == '') {
        return res.render('main', {
            firstCode: req.body.first,
            secondCode: req.body.second,
            LD: null,
            WS: null,
            verdict: null,
            alarm: 'Something is missing...'
        });
    }
    f = parse(req.body.first);
    s = parse(req.body.second);
    const LD = levenshtein(f.tokens, s.tokens).toFixed(2);
    const WS = wShingling(f.tokens, s.tokens).toFixed(2);
    res.render('main', {
        firstCode: req.body.first,
        secondCode: req.body.second,
        LD: LD, 
        WS: WS,
        verdict: (LD >= 80 || WS >= 80),
        alarm: null
    });
});

app.get('/', (req, res, next) => {
    res.render('main', {
        firstCode: null,
        secondCode: null,
        WS: null,
        LD: null,
        verdict: null, 
        alarm: null
    });
});

app.listen(3000);