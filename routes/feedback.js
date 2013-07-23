var mysql = require('mysql');
var config = require('../config');

var connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  port: config.mysql.port
});



exports.post = function(req,res){
	//res.header("Access-Control-Allow-Origin", "http://localhost:8090");
	//res.header("Access-Control-Allow-Origin", "http://localhost:3003");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //res.header('Access-Control-Allow-Headers', 'Content-Type');

  data = req.body;

  connection.connect(function(err){
  	if (err) throw err;
  	connection.query('USE fbdb');
 		connection.query("INSERT INTO feedback VALUES('2', '" + data['free-text'] + "')", function(err, result){
 			if (err) throw err;
 			connection.query('SELECT * FROM feedback', function(err, rows){
 				if (err) throw err;
 				console.log(rows);
 			});
 		});
	});
  console.log(data['free-text']);
  res.send(200);
};

exports.get = function(req,res){
  connection.connect(function(err){
  if (err) throw err;
  connection.query('USE fbdb');
  connection.query("INSERT INTO feedback VALUES('2', '" + data['free-text'] + "')", function(err, result){
    if (err) throw err;
    connection.query('SELECT * FROM feedback', function(err, rows){
      if (err) throw err;
      res.json(rows);
      });
    });
  });

}