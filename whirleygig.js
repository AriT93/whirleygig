var sys = require('sys'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    event = require('events'),
    url  = require('url'),
    net = require('net');


var simple_event = new event.EventEmitter();

function pushData(){
    var data = "[{\"text\" : \"wibble\"},{\"text\": \"wabble\"}]";
    simple_event.emit("emission",data);
}

setInterval(pushData, 5000);

function handleData(data){
    var p = JSON.parse(data);
    p.forEach(function(p){
        console.log(p.text);
    });
}

var listener = simple_event.addListener("emission",handleData);

var server = net.createServer(function(socket){
    socket.setEncoding("utf8");
    socket.addListener("connect",function(){
        socket.write("hello\r\n");
    });

    socket.addListener("data", function(data){
        simple_event.emit("emission", data);
    });

    socket.addListener("end",function(){
        socket.write("goodbye\r\n");
        socket.end();
    });
});

server.listen(8000,"127.0.0.1");

http.createServer(function(request, response){
    var uri = url.parse(request.url).pathname;
    if(uri === "/stream"){
        var listener = simple_event.addListener("emission",function(emitted){
            response.writeHead(200, {"Content-Type":"text/plain"});
            response.write(emitted);
            response.end();

            clearTimeout(timeout);
        });

        var timeout = setTimeout(function(){
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify([]));
            response.end();
        },10000);
    }
    else
      {
          var filename = path.join(process.cwd(), uri);
          path.exists(filename, function(exists){
              if(!exists){
                  response.writeHead(404, {"Content-Type": "text/plain"});
                  response.write("404 Not Found");
                  response.end();
                  return;
              }

              fs.readFile(filename, "binary", function(err, file){
                  if(err){
                      response.writeHead(500, {"Content-Type":"text/plan"});
                      response.write(err + "\n");
                      response.end();
                      return;
                  }

                  response.writeHead(200);
                  response.write(file,"binary");
                  response.end();
              });
          });
      }
}).listen(8992);
