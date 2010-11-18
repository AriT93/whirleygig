var sqlite = require('sqlite'),
    message = require('Message');

MessageDb = function(dbfile){
    var db = new sqlite.Database();
    db.open(process.cwd() + dbfile,function(err){
        if(err){
            console.log("err :" + err);
            throw err;
        }
    });
};

MessageDb.prototype.find = function(id){
    db.prepare("select * from messages where text like '%?%';", function(err,stmt){
        if(err){
            throw err;
        }
        stmt.fetchAll(function(err, rows){
            if(err){
                throw err;
            }
            return rows;
        });
    });
};

MessageDb.prototype.save = function(m){
    db.execute("insert into messages(text) values(?);",m.text,function(err,rows){
        if(err){
            throw err;
        }
        console.log("message added :" + rows);
    });
};

exports.MessageDb = MessageDb;