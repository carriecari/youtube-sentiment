/*eslint node:true */
/*jslint node:true */
var https = require('https');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var Sentiment = require('sentiment');
var React = require('react');
//import Video from './components/video';

//Takes in user input and returns xml page
var parseVideoID = function(req, res) {
    var urltext = req.body.video;
    var re = /https\:\/\/www\.youtube\.com\/watch\?v\=(.*)/i;
    var reg = new RegExp(re);
    var isMatched = reg.test(urltext);

    if (isMatched) {

        let videoIDinitial = reg.exec(urltext);
        var videoID = videoIDinitial[1];
        var xmlURL = String("https://www.youtube.com/api/timedtext?lang=en&v=") + videoID;

        parser.on('error', function(err) { console.log('Parser error', err); });

        var data = '';
        var score = '';

        return new Promise(function(resolve, reject) {

            https.get(xmlURL, function(res) {
                if (res.statusCode >= 200 && res.statusCode < 400) {
                    res.on('data', function(data_) { data += data_.toString(); });
                    res.on('end', function() {
                        //transcript text
                        //console.log('data', data);
                        var sentiment = new Sentiment();
                        var result = sentiment.analyze(data);
                        score = result.score;
                        resolve(result);
                        console.log(score);

                    });
                }
                else {reject(err);
                     }});

        })}

};

//var parseXML = function(xml) {
//    parser.on('error', function(err) { console.log('Parser error', err); });
//
//    var data = '';
//    https.get(xml, function(res) {
//        if (res.statusCode >= 200 && res.statusCode < 400) {
//            res.on('data', function(data_) { data += data_.toString(); });
//            res.on('end', function() {
//                //transcript text
//                //console.log('data', data);
//                var sentiment = new Sentiment();
//
//                sentimentObj = sentiment.analyze(data);
//                var score = result.score;
//                console.log(score);
//                console.log("in parse xml")
//                return score;
//            });
//        }});
//}
module.exports.parseVideoID = parseVideoID;  


