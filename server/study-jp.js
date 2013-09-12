/*******************
 * WebSocket
 *******************/
var http  = require('http');
var express = require('express');
var mongo = require('./mongo.js');
var sys = require('sys');

var app = express()
    , http = require('http')
    , server = http.createServer(app);

app.use(express.bodyParser());

app.get('/',function(req,res){
    getRequest(req.url,res);
});

app.post('/',function(req,res){
    postRequest(req, res);
});

/*******************
 * Callback
 *******************/
var returnJson = function (res,_json){

    console.log("INFO: soccer-jp.js > returnJson");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.send(_json);
    //console.log(_json);
    res.end(disconnect());
}

var disconnectCall = function (res,str){

    console.log("INFO: soccer-jp.js > disconnectCall");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.statusCode = 200;
    res.send(str);
    res.end(disconnect());
}

/*******************
 * Private Method 
 *******************/
function disconnect(){

    str = "INFO: Disconnect";
    return str;
}

function getRequest(url, res){

    console.log("INFO: GET");
    var params = url.split("?")[1];
    var arrayParams = params.split("&");
    var id = arrayParams[0].split("=")[1];
    return mongo.get(id, res, arrayParams, returnJson);
}

function postRequest(req, res){

    console.log("INFO: POST");
    //console.log("DEBUG: POST PARAMETER/"+req.body.game.id);
    if("true"==req.body.delete){
        return mongo.delete(req.body.api, req.body, res, disconnectCall);
    }else{
        return mongo.save(req.body.api, req.body, res, disconnectCall);
    }
}

/*******************
 * Start Server
 *******************/
server.listen(8080);
console.log('INFO: Server started on 8080');
