<<<<<<< HEAD
Message = function(){};
=======
require.paths.unshift('lib');
require.paths.unshift('.');

var messagedb = require('messagedb'),
    sqlite = require('sqlite');


function handleQuery(data){
    console.log(data);
};
>>>>>>> 8811f2db546a19bca86c47222c548ce680b08d7b


  __db = new messagedb.MessageDb('/messages.db');

Message = function(){
//    this.db = __db;
};

Message.prototype.id = '';
Message.prototype.text = "";
Message.prototype.find = function(id){
   __db.find(id);
};
Message.prototype.save = function(){
    __db.save(this);
};


exports.Message = Message;