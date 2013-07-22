var mysql = require('mysql');
var config = require('../config')

exports.testTesting = function(test){
	test.ok(true, "this should work");
	test.done();
}

exports.testConnection = function(test){
	  var connection = mysql.createConnection({
  	host: config.mysql.host,
  	user: config.mysql.user,
  	password: config.mysql.password,
  	port: config.mysql.port
  });

  connection.connect();	
	test.ok(connection, "connection is not undefined");
	test.done();

}

exports.testDB = function(test){
	  var connection = mysql.createConnection({
  	host: config.mysql.host,
  	user: config.mysql.user,
  	password: config.mysql.password,
  	port: config.mysql.port,
  	database: 'feedbackdb'
  });

  connection.connect(function(err){
 		connection.query('CREATE TABLE feedback(ID int, fbText varchar(255))');
 		connection.query('INSERT INTO feedback VALUES(1, test)');
 		connection.query('SELECT * FROM feedback', function(err, rows){
 			test.ok(rows, "rows exist");
			test.done();
 		});
	});
}