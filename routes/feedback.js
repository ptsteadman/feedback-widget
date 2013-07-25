var db = require('../database');


/*
exports.post = function(req,res){
	//res.header("Access-Control-Allow-Origin", "http://localhost:8090");
	//res.header("Access-Control-Allow-Origin", "http://localhost:3003");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //res.header('Access-Control-Allow-Headers', 'Content-Type');

  db.addFeedback(req.body, function(err){
    io.emit('new');



    if (err) res.send(500);
    if (!err) res.send(200);
  });
};
*/

exports.get = function(req,res){
  db.getAllFeedback(function(data){
    res.json(data);
  });
}

exports.deleteAll = function(req,res){
  db.deleteAll(function(err){
    res.send(200);
  })
}

exports.createTable = function(req, res){
  db.createTable('feedback', function(err){
    res.send(200);
  })
}

    