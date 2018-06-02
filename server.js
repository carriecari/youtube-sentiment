const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()
const https = require('https')

var bodyParser = require('body-parser')
var parseVideoID = require('./main.js')
var parseInput = require('./main.js')

//FOR TESTING PURPOSES
var re = /https\:\/\/www\.youtube\.com\/watch\?v\=(.*)/;
var reg = new RegExp(re);


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', function (req, res)  {
       res.render('index');
    
})

app.post('/', function(req, res){
    var urltext = req.body.video;
    console.log(urltext);
    var ismatched = reg.test(urltext);
    console.log(ismatched);
    var sentimentAnalysis = parseVideoID(urltext);
//    printToPage(sentimentAnalysis.score, sentimentAnalysis.words);
    //res.render('index');
    res.end();
	});

app.put('/update-data', function (req, res) {
    res.send('PUT Request');
});

app.delete('/delete-data', function (req, res) {
    res.send('DELETE Request');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))