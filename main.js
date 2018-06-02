/*eslint node:true */
/*jslint node:true */
var https = require('https');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var Sentiment = require('sentiment');



var videoURL = "";


//https://www.youtube.com/watch?v=SkyoxlXimvY

//Takes in user input and returns xml page
var parseVideoID = function(req) {
    var re = /https\:\/\/www\.youtube\.com\/watch\?v\=(.*)/i;
    var reg = new RegExp(re);
    var isMatched = reg.test(req);

    if (isMatched) {
        
        let videoIDinitial = reg.exec(req);
        var videoID = videoIDinitial[1];
        var xmlURL = String("https://www.youtube.com/api/timedtext?lang=en&v=") + videoID;
        console.log(xmlURL);
        var result = sentimentAnalysis(xmlURL);                     
      return result;
      
  } else {
      return "error";
  }
    

}


var sentimentAnalysis = function(xml) {

    var Sentiment = require('sentiment');
    var sentiment = new Sentiment();
    var score = sentiment.analyze(xml);
    console.log(score);
    
    
     parser.on('error', function(err) { console.log('Parser error', err); });

     var data = '';
     https.get(xml, function(res) {
         if (res.statusCode >= 200 && res.statusCode < 400) {
           res.on('data', function(data_) { data += data_.toString(); });
           res.on('end', function() {
             console.log('data', data);
                var sentiment = new Sentiment();
                var score = sentiment.analyze(data);
                console.log(score);

             });
           }});
         
    printToPage(score.score, score.words);å
    return score;
    
}

var printToPage = function(score, words) {
   
//    var element = document.createElement(tagName[, options]);
    var newContent = document.createTextNode("Sentient score:" + score); 

     //newDiv.appendChild(newContent);  
    document.getElementById("video_info").appendChild(newContent);
    
}

module.exports = printToPage;
module.exports = sentimentAnalysis;
module.exports = parseVideoID;
