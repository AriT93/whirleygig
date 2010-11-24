require.paths.unshift('lib');
require.paths.unshift('.');

var messagedb = require('messagedb'),
    sqlite = require('sqlite');


function handleQuery(data){
    console.log(data);
};


Message = function(){
};

Message.prototype.id = '';
Message.prototype.text = "";
Message.prototype.find = function(id){
    var db = new messagedb.MessageDb('/lib//messages.db');
    var listener = db.addListener("select", handleQuery);
    db.find(id);
};
Message.prototype.save = function(){
    var db = new messagedb.MessageDb('/lib/messages.db');
    var listener = db.addListener("select", handleQuery);
    db.save(this);
};


exports.Message = Message;