var mysql = require('mysql');
var config = require('../config')

exports.testTesting = function(test){
	test.ok(true, "this should work");
	test.done();
}

exports.testDB = function(test){
	  var connection = mysql.createConnection({
  	host: 'feedback-widget.czwvwkbas6cq.us-west-2.rds.amazonaws.com;dbname=fbdb',
  	user: 'priceline',
  	password: 'priceline',
  	port: '3306'
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