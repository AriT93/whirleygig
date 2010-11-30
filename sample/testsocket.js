var http = require('http'),
    io = require('socket.io'),
    url = require('url'),
    fs = require('fs'),
    sys = require('sys');


var server = http.createServer(function(req, res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<h1>Hello World</h1>');
    res.end();
});

server.listen(8080);

var socket = io.listen(server),
    buffer = [];


socket.on('connection', function(client){
    client.send({buffer: buffer});
    client.broadcast({announcement: client.sessionId + ' connected'});

    client.on('message', function(message){
    var msg = { message: [client.sessionId, message] };
    buffer.push(msg);
    if (buffer.length > 15) buffer.shift();
    client.broadcast(msg);
    client.send({message: ['bob', 'bibble']});
    });
    client.on('disconnect', function(){
        console.log(" I've disconnected " + client.sessionId);
    });
});