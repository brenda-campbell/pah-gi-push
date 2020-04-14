var Client = require('node-rest-client').Client;
var JSON = require('JSON');
var parseString = require('xml2js').parseString;
var http = require('http');

exports.retrieve = function retrieve(callback) {
	
   console.log("Retrieve the Access token");
   var client = new Client();
   var argsHeader = {};
   var responseData = {};
   var tokenResponseData = {};
   
   var URL = process.env.AUTH_ENDPOINT;
   var args = {
       data: getBodySection(),
	   headers: {"Content-Type": "application/json"}
   };

   var argsHeader = JSON.stringify(args.headers); 
   client.post(URL, args, function (data, response) {	    		
		console.log(data);		
		callback(data);		
	});		
  
}

function getBodySection() {
	var bodySection = JSON.stringify({
		"grant_type": "client_credentials",
		"client_id": process.env.CLIENT_ID,
		"client_secret": process.env.CLIENT_SECRET 
		});
	return bodySection;
}
