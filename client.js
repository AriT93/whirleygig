require.paths.unshift('lib');
var net = require('net'),
    message = require('Message');

var stream  = new net.Stream();
stream.setEncoding('utf-8');
var streamdata = stream.addListener("data", function(data){
    console.log(data);
});

stream.addListener("end",function(){
    stream.destroy();
    process.exit();
});
var counter = 0;

stream.connect(8000, host="127.0.0.1");


function pushDatatoStream(){
    counter +=1 ;
    var data = new Array();
    var m = new message.Message();
    m.text = "stream";
    data.push(m);
    m.save()
    m = new message.Message();
    m.text = "data";
    data.push(m);
    m.save()
    stream.write(JSON.stringify(data));
    // if(counter > 10){
    //   clearInterval(pushDatatoStream);
        stream.end();
//    }
}

setInterval(pushDatatoStream, 5000);
