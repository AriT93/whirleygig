require.paths.unshift('lib');
require.paths.unshift('.');

var messagedb = require('messagedb'),
//    sqlite = require('sqlite'),
    event = require('events');

var __message_event = new event.EventEmitter();
var db = new messagedb.MessageDb('/lib/messages.db');
Message = function(){
    this.id='';
};

Message.prototype.listener = db.addListener("insert", handleQuery);

function handleQuery(data){
    __message_event.emit('update',data);
};



Message.prototype.id = '';
Message.prototype.text = "";
Message.prototype.find = function(id){
    db.find(id);
};
Message.prototype.save = function(){
    db.save(this);
};
Message.prototype.addListener = function(event, handler){
        __message_event.addListener(event,handler);
};

exports.Message = Message;