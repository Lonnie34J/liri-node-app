var spotify = require('spotify');

//Switch statements to activate function call backs upon user input
var liriCommands = process.argv[2];

var userInput = process.argv[3];


//grabs and creates variable for all twitter related content
	var twitterRequest = require("twitter");
	var keys = require("./keys");
	var twitterKeys = keys.twitterKeys;
	var myTweets = new twitterRequest(twitterKeys);
	//console.log(keys);
	//=========================================================//

var request = require("request");


	switch(liriCommands){
		case "my-tweets":
			getTweets(myTweets);
			break;
		//When user inputs song they need to include a + between words(look into fixing this if there is extra time)
		case "spotify-this-song " + userInput:
			getSpotify();
			break;

		case "movie-this " + userInput:
			getMovie();
			break;
};







function getTweets(myTweets){
	//sets the search parameters to a varible 
	var params = {screen_name : 'Odd_Realm', count : 20};

		myTweets.get('statuses/user_timeline', params, function (error, data, response) {
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

}
//Spotify code 

function getSpotify(){
	
	spotify.search({ type: 'track', query: userInput }, function (err, data) {
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
};

//omdb code ================================================

function getMovie() {

	request('http://www.omdbapi.com/?t=' +userInput+ '&y=2016&plot=short&tomatoes=true&r=json', function (error, response, body){

		if (!error && response.statusCode == 200){
			console.log("Movie Title: "+JSON.parse(body)["Title"]);
			console.log("Release Year: "+JSON.parse(body)["Year"]);
			console.log("IMDB Rating: "+JSON.parse(body)["imdbRating"]);
			console.log("Country: "+JSON.parse(body)["Country"]);
			console.log("Language: "+JSON.parse(body)["Language"]);
			console.log("Plot: "+JSON.parse(body)["Plot"]);
			console.log("Actors: "+JSON.parse(body)["Actors"]);
			console.log("Rotten Tomatoes Rating: "+JSON.parse(body)["tomatoRating"]);
			console.log("Rotten Tomatoes Url: "+JSON.parse(body)["tomatoURL"]);
		}else{
			throw error;
		}

	});
}