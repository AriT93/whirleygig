require.paths.unshift('lib');
var net = require('net'),
    message = require('Message');

var stream  = new net.Stream();
stream.setEncoding('utf-8');
var streamdata = stream.addListener("data", function(data){
    //console.log(data);
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
    var m2 = new message.Message();
    m.text = "stream";
    data.push(m);
    m.save()
    m2.text = "data";
    data.push(m2);
    m2.save()
    stream.write(JSON.stringify(data));
    if(counter > 10){
    clearInterval(pdinterval);
    stream.end();
    }
    // console.log(pdinterval);
    // clearInterval(pdinterval);
    // process.exit();
}

pdinterval = setInterval(pushDatatoStream, 5000);
