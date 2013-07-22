var mysql = require('mysql');
var config = require('../config')

exports.testTesting = function(test){
	test.ok(true, "this should work");
	test.done();
}

exports.testDB = function(test){
	  var connection = mysql.createConnection({
  	host: 'feedback-widget-db.czwvwkbas6cq.us-west-2.rds.amazonaws.com;dbname=feedbackdb',
  	user: config.mysql.user,
  	password: config.mysql.password,
  	port: config.mysql.port
  });

  connection.connect(function(err){
  	console.log(err);
 		connection.query('CREATE TABLE feedback(ID int, fbText varchar(255))');
 		connection.query('INSERT INTO feedback VALUES(1, test)');
 		connection.query('SELECT * FROM feedback', function(err, rows){
 			test.ok(rows, "rows exist");
			test.done();
 		});
	});
}