require.paths.unshift('lib');

var net = require('net'),
    message = require('Message'),
    sys = require('sys');

var stream  = new net.Stream();
stream.setEncoding('utf-8');
var streamdata = stream.addListener("data", function(data){
//    console.log(data);
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
    var m =  new message.Message();
    var mlistener = m.addListener('update',function(data){
        m.id = data;
    });
    var m2 = new message.Message();
    var m2listener = m2.addListener('update',function(data){
        m2.id = data;
    });
    m2.text = "stream";
    m2.save();
    data.push(m2);
//    console.log(m.id);
    m.text = "data";
    m.save();
    data.push(m);
    stream.write(JSON.stringify(data));
    if(counter > 10){
    clearInterval(pdinterval);
    stream.end();
    //process.exit();
    }
    // console.log(pdinterval);
    // clearInterval(pdinterval);
    // process.exit();
}

pdinterval = setInterval(pushDatatoStream, 5000);
