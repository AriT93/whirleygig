var sqlite = require('sqlite'),
    message = require('Message'),
    event = require('events');
var __dbevent = new event.EventEmitter();

MessageDb = function(dbfile){
    this.dbfile = dbfile;
};


var db = sqlite.Database();

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
    db.open(process.cwd() + this.dbfile,function(err){
        if(err){
            console.log("err :" + err);
            throw err;
        }
        db.execute("insert into messages(text) values(?);",[m.text],function(err,rows){
            if(err){
                console.log("! : " + m.text + " : " + err);
                throw err;
            }
            db.execute("select last_insert_rowid();",function(err, rows){
                if(err) throw err;
                rows.forEach(function(r){
                    this.insert_id = r['last_insert_rowid()'];
                    console.log(this.insert_id);
                });
            });
        });
    });
};

exports.MessageDb = MessageDb;
