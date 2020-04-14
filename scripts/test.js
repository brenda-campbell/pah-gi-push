var Client = require('node-rest-client').Client;
var JSON = require('JSON');
var parseString = require('xml2js').parseString;
var http = require('http');

exports.retrieve = function retrieve(callback) {
    console.log("testing ... ");
    callback({'count' : '{-test-}', 'total' : '{-total-}'});
}