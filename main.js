/*eslint node:true */
/*jslint node:true */

var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var result = sentiment.analyze('Cats are stupid.');

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
                              
      return xmlURL;
      
  } else {
      return "error";
  }
    

}


module.exports = parseVideoID;
