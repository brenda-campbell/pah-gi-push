var Client = require('node-rest-client').Client;
var JSON = require('JSON');
var parseString = require('xml2js').parseString;
var http = require('http');

exports.retrieve = function retrieve(callback) {
	
   console.log("Retrieve the Access token");
   var client = new Client();
   var argsHeader = {};
   var responseData = {};
   var pushResponseData = {};
   
   var URL = process.env.AUTH_ENDPOINT;
   var args = {
       data: getBodySection(),
	   headers: {"Content-Type": "application/json"}
   };

   var argsHeader = JSON.stringify(args.headers); 
   client.post(URL, args, function (data, response) {	
		responseData = data;
		console.log(responseData);
	
		var accessToken = responseData['access_token'];
		
		console.log(accessToken);

		var PUSHURL = "https://mcfqgk9bc35yxj6gw9y07g8wrbbq.rest.marketingcloudapis.com/push/v1/messageContact/NzoxMTQ6MA/send";
		
		var bearerToken = "Bearer " + accessToken;		
		var pushArgs = {
			data: getPushBodySection(),
				headers: { "Authorization": bearerToken,
				"content-type": "application/json",
			}
		};
		
		client.post(PUSHURL, pushArgs, function (data, response) {
			pushResponseData = data;
			if (response.statusCode == 200) {
				console.log("Success sending push");
			} 

			console.log(pushResponseData);
			callback({'AuthHeader': argsHeader, 'AuthBody': getBodySection(),'BearerToken' : bearerToken, 'PushArgs': JSON.stringify(pushArgs.headers),'SubscribersPassed': JSON.stringify(pushArgs.data), 'TokenID' : JSON.stringify(pushResponseData)});
		});
			
	});		
  
}

function getPushBodySection() {
	var data = JSON.stringify({
		"subscriberKeys": [
			  "e25ef4e8-82e4-4b98-96cf-5149c110cfe7"
		  ],
		  "Override": true,
		  "MessageText": "Test trigger send from Heroku app for GI",
		  "title": "Missing pet - Test from Brenda",
		  "subtitle": "Lost Pet Alert via Heroku to Andy",
		  "Badge": "+1"
		});
	return data;
}

function getBodySection() {
	var bodySection = JSON.stringify({
		"grant_type": "client_credentials",
		"client_id": process.env.CLIENT_ID,
		"client_secret": process.env.CLIENT_SECRET 
		});
	return bodySection;
}
