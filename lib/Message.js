var messdb = require('messagedb'),
    sqlite = require('sqlite');

Message = function(){
    var db = new messdb.MessageDb("messages.db");
};

Message.prototype.id = '';
Message.prototype.text = "";
Message.prototype.find = function(id){
    return db.find(id);
};
Message.prototype.save = function(){
    db.save(this);
};


exports.Message = Message;