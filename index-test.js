var express = require('express');
var app = express();
var server = require('http').createServer(app);
var processor = require ('./scripts/test.js');

app.set('port', (process.env.PORT || 5000));

server.listen(app.get('port'), function() {
    console.log(require(__dirname + '/package.json').name + ' is running on port', app.get('port'));
});

var io = require('socket.io').listen(server);

app.get('/', function(request, response) {
    response.send('<h1>Welcome to Pets At Home GI Push -TEST</h1>');
});

app.get('/import', function(request, response) {
    response.sendFile(__dirname +'/views/pages/import.html');  
});

/** Processor **/
app.get('/apps/process', function(request, response) {
    console.log("[PAH_GI_PUSH] :: Starting ");    

    processor.retrieve(function(data) {
        // console.log("[PAH_GI_PUSH] :: callback : "+ data.count);     
        io.sockets.emit('import-status-update', data);
    });
});