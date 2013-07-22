var mysql = require('mysql');
var config = require('../config');

exports.post = function(req,res){
	//res.header("Access-Control-Allow-Origin", "http://localhost:8090");
	//res.header("Access-Control-Allow-Origin", "http://localhost:3003");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //res.header('Access-Control-Allow-Headers', 'Content-Type');
  var connection = mysql.createConnection({
  	host: config.mysql.host,
  	user: config.mysql.user,
  	password: config.mysql.password,
  	port: config.mysql.port
  });

  connection.connect();

  data = req.body;
  console.log(data['free-text']);
  res.send(200);
};