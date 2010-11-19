var sqlite = require('sqlite'),
    message = require('Message'),
    event = require('events');
var __dbevent = new event.EventEmitter();

MessageDb = function(dbfile){
    this.dbfile = dbfile;

};
MessageDb.prototype.addListener = function(event, handler){
    __dbevent.addListener(event,handler);
};

MessageDb.prototype.find = function(id){
    id = "%" + id + "%";
    var db = sqlite.Database();
    this.dbevent = new event.EventEmitter();
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
    var db = sqlite.Database();
    console.log(process.cwd() + " " + this.dbfile);
    console.log(m.text + " will be added to : " + db);

    db.open(process.cwd() + this.dbfile,function(err){
        if(err){
            console.log("err :" + err);
            throw err;
        }
        db.execute("insert into messages(text) values(?);",[m.text],function(err,rows){
            if(err){
                throw err;
            }
            console.log("message added :" + rows);
        });
    });
    db.close(function(err){

    });
};

exports.MessageDb = MessageDb;
