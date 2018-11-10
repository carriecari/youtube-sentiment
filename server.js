const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()
const https = require('https')
var bodyParser = require('body-parser')

var main = require('./main.js')
var parseVideoID = require('./main.js')

var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var Sentiment = require('sentiment');



app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to ejs
app.set('view engine', 'ejs');
// GET /
app.get('/', function (req, res)  {


    res.render('index');
});

app.get('/about', function (req, res)  {
    res.render('about');
});

app.get('/video', function(req, res) {

    res.render('pages/index', {

    });
});

app.post('/', function(req, res){
    var urltext = req.body.video;

    main.parseVideoID(req, res).then(function(result) {
        var score = result.score;
        var pos = result.positive;
        var neg = result.negative;
        var comp = (result.comparative).toFixed(4);

        res.render('video', {
            videolink: urltext,
            score: score,
            pos: pos,
            neg: neg,
            comp: comp,
        })
        res.end();
    })
        .catch(error => {
        res.render('error');
        res.end();

    });
});

app.put('/update-data', function (req, res) {
    res.send('PUT Request');
});

app.delete('/delete-data', function (req, res) {
    res.send('DELETE Request');
});

// Server
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
