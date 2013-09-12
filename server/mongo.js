var mongoose = require('mongoose');
var schema   = require('./schema.js');
var sys = require('sys');

var DB_PATH = 'mongodb://localhost/test';
var mongo = {save:{}, get:{}};


/********************************************************
 *      SAVE
 ********************************************************/
mongo.save = function(api, params, res, callback){

    console.log('INFO: mongo.js > mongo.save');

    //console.log("DEBUG: "+sys.inspect(params)+"\n");

    var db       = mongoose.createConnection(DB_PATH);
    var model = db.model(api, new mongoose.Schema(schema.getSchema(api)));
    var obj   = new model(params);

    console.log("DEBUG:  SaveObject="+obj);
    console.log("DEBUG: Param= " + sys.inspect(schema.getUpdateKey(api,params)));

    var updateKey = schema.getUpdateKey(api,params);

    model.find(updateKey,function(err, mice){
        if(err){
            console.log("ERROR: mongo.js > mongo.get");
            console.log(err);
        }else{
            console.log("DEBUG: Data length "+ mice.length);
            if(0<mice.length){
                console.log("INFO: Update Function");
                model.update(updateKey,{$set:params},{upsert:false,multi:true},
                    function(err){
                        if(err){
                            console.log("ERROR: mongo.js > mongo.save");
                            console.error(err);
                        }else{
                            console.log('INFO: mongo.js > mongo.save [Data save success]');
                            callback(res, "success");
                        }
                    }
                );
            }else{
                console.log("INFO: Save Function");
                obj.save(
                    function(err){
                        if(err){
                            console.log("ERROR: mongo.js > mongo.save");
                            console.error(err);
                        }else{
                            console.log('INFO: mongo.js > mongo.save [Data save success]');
                            callback(res, "success");
                        }
                    }
                );
            }
        }
    });
}

/********************************************************
 *      GET
 ********************************************************/
mongo.get = function(api, res, params, callback){

    var db       = mongoose.createConnection(DB_PATH);
    var model = db.model(api, new mongoose.Schema(schema.getSchema(api)));

    console.log("DEBUG: Param= " + sys.inspect(schema.getFindKey(api,params)));

    model.find(schema.getFindKey(api,params),function(err, mice){
        if(err){
            console.log("ERROR: mongo.js > mongo.get");
            console.log(err);
        }else{
            console.log('INFO: mongo.js > mongo.get [Data get success]');
            callback(res, mice);
        }
    });

}

/********************************************************
 *      DELETE
 ********************************************************/
mongo.delete = function(api, params, res, callback){

    var db       = mongoose.createConnection(DB_PATH);
    var model = db.model(api, new mongoose.Schema(schema.getSchema(api)));
    var obj   = new model(params);

    var deleteKey = schema.getUpdateKey(api,params);

    model.remove(deleteKey,function(err){
        if(err){
            console.log("ERROR: mongo.js > mongo.delete");
            console.log(err);
        }else{
            console.log('INFO: mongo.js > mongo.delete [Data get success]');
            callback(res,"success");
        }
    });

}

module.exports = mongo;
