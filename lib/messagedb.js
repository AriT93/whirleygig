var sqlite = require('../vendor/sqlite'),
    message = require('Message'),
    event = require('events');

var __dbevent = new event.EventEmitter();

MessageDb = function(dbfile){
    this.dbfile = dbfile;
};



MessageDb.prototype.insert_id = 0;
MessageDb.prototype.addListener = function(event, handler){
    __dbevent.addListener(event,handler);
};

MessageDb.prototype.find = function(id){
    id = "%" + id + "%";
    db.open(process.cwd() + this.dbfile,function(err){
        if(err){
            console.log("err :" + err);
            throw err;
        }
        db.prepare("select * from messages where text like ?;", function(err,stmt){
            if(err){
                throw err;
            }
            stmt.bindArray([id],function(){
                stmt.fetchAll(function(err, rows){
                    if(err){
                        throw err;
                    }
                    __dbevent.emit("select",JSON.stringify(rows));
                });
            });
        });
    });
    return this.retval;
};

MessageDb.prototype.save = function(m){
    var db = sqlite.openDatabaseSync(process.cwd() + this.dbfile);
    db.addListener("update", function(op,datab,table, rowid){
        __dbevent.emit("insert",rowid);
    });
    db.query("INSERT INTO messages(text) values(?)",[m.text]);
};

exports.MessageDb = MessageDb;
