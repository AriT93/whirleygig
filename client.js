var net = require('net');

var stream  = new net.Stream();
stream.setEncoding('utf-8');
var streamdata = stream.addListener("data", function(data){
    console.log(data);
});



stream.connect(7000, host="localhost");


function pushDatatoStream(){
    var data = '[{"text" : "stream "},{"text": "data"}]';
    stream.write(data);
}

setInterval(pushDatatoStream, 5000);
