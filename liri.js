//Switch statements to activate function call backs upon user input
var liriCommands = process.argv[2];
var spotifyInput = process.argv[3];

function activateCommands(){
	switch(liriCommands){
		case "my-tweets":
		getTweets();
		break;

		case "spotify-this-song" + spotifyInput:
		getSpotify();
		break;
};
};


//grabs and creates variable for all twitter related content
var twitterRequest = require("twitter");
var keys = require("./keys");
var twitterKeys = keys.twitterKeys;
var myTweets = new twitterRequest(twitterKeys);
//console.log(keys);
//=========================================================//


//sets the search parameters to a varible 
var params = {screen_name : 'Odd_Realm', count : 20};

	myTweets.get('statuses/user_timeline', params, function getTweets (error, data, response) {
  	if (!error) {
  		//console.log(data[2].created_at);
  		//console.log(data[2].text);
  		var tweets = data;
  		for (var i = 0; i<tweets.length; i++){
  			console.log("=============================");
  			console.log(tweets[i].created_at);
  			console.log(tweets[i].text);
  			console.log("=============================");
  		}
  	}
  	else{
  		throw error;
  	}
});


//Spotify code 

var spotify = require('spotify');


	spotify.search({ type: 'track', limit : 2, query: spotifyInput }, function getSpotify (err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    } 
	    
	    else{
	    	console.log("Artist: " + data.tracks.items[0].artists[0].name);
	    	console.log("Preview: "  + data.tracks.items[0].preview_url);
	    	console.log("Song Name: " + data.tracks.items[0].name);
	    	console.log("Album Name: " + data.tracks.items[0].album.name);

	    	console.log("-------------------------------------------------------")

	    	console.log("Artist: " + data.tracks.items[1].artists[0].name);
	    	console.log("Preview: "  + data.tracks.items[1].preview_url);
	    	console.log("Song Name: " + data.tracks.items[1].name);
	    	console.log("Album Name: " + data.tracks.items[1].album.name);
	    }
	 
	   
	});