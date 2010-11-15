var net = require('net');

var stream  = new net.Stream();
stream.setEncoding('utf-8');
var streamdata = stream.addListener("data", function(data){
    console.log(data);
});


var counter = 0;

stream.connect(8000, host="127.0.0.1");


function pushDatatoStream(){
    counter +=1 ;
    var data = '[{"text" : "stream "},{"text": "data"}]';
    stream.write(data);
    if(counter > 10){
      clearInterval(pushDatatoStream);
        stream.end();
        stream.destroy();
        process.exit();
    }
}

setInterval(pushDatatoStream, 5000);
