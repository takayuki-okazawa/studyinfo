var schema = {getSchema:{}, getSaveData:{}};

var schemaFunction = {};
var updateKey = {};
var findKey = {};

/* public */
schema.getSchema = function(id){
	console.log('INFO: schema.js > schema.getSchema');
    return schemaFunction[id];
}

/* public */
schema.getUpdateKey = function(id, params){
    console.log('INFO: schema.js > schema.getUpdateKey');

    var obj = updateKey[id];
    return obj(params);
}

/* public */
schema.getFindKey = function(id, params){
    console.log('INFO: schema.js > schema.getFingKey');
    console.log(id);
    var obj = findKey[id];
    return obj(params);
}

/**********************************************
 * スケジュール情報
 **********************************************/

schemaFunction['004'] = {
    api: String,
    name: String,
    code:String,
    flag:String,
	id: String,
	date_start_jp: String,
	date_start_local: String,
	home_id: String,
	away_id: String,
	home_name: String,
	away_name: String,
	stadium_name: String
};

updateKey['004'] = function(params){
	return {id:params.id};
}

findKey['004'] = function(params){
    if("id=all"!=params[1]){
      var id_value = params[1].split("=")[1];
	  return {id:id_value};
    }else{
	  return {};
    }
};


/**********************************************
 * 選手情報
 **********************************************/

schemaFunction['005'] = {
    api: String,
    id: String,
    name:Array,
    position:Array,
    belonging:Array
};

updateKey['005'] = function(params){
	return {id:params.id};
}

findKey['005'] = function(params){
    var _id = "";

    for(var i=0; i< params.length; i++){
        var p = params[i];

        if(p.substring(0,2) == "id"){
           _id = p.substring(3);
        }
    }
	return {id:_id};
}


/**********************************************
 * スタメン情報
 **********************************************/

schemaFunction['001'] = {
    api: String,
    id: String,
    home_name:Array,
    home_position:Array,
    home_status:Array,
    away_name:Array,
    away_position:Array,
    away_status:Array
};

updateKey['001'] = function(params){
	return {id:params.id};
}

findKey['001'] = function(params){
	return {id:params[1].split("=")[1]};
}

/**********************************************
 * 結果速報入力情報
 **********************************************/

schemaFunction['002'] = {
    api: String,
    id: String,
    point:Array,
    status:String,
    etc:String,
    game_history:String,
    chenge_member:Array,
    point_info:Array,
    game_alert:Array
};

updateKey['002'] = function(params){
	return {id:params.id};
}

findKey['002'] = function(params){
	return {id:params[1].split("=")[1]};
}


// Exports
module.exports = schema;
