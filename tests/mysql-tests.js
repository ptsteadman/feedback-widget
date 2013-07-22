var mysql = require('mysql');
var config = require('../config')

exports.testTesting = function(test){
	test.ok(true, "this should work");
	test.done();
}

exports.testDB = function(test){
	  var connection = mysql.createConnection({
  	host: 'feedback-widget.czwvwkbas6cq.us-west-2.rds.amazonaws.com',
  	user: 'priceline',
  	password: 'priceline',
  	port: '3306'
  });

  connection.connect(function(err){
  	console.log(err);
  	connection.query('USE fbdb');
 		connection.query("INSERT INTO feedback VALUES('2', 'blah')", function(err, result){
 			if (err) throw err;
 			connection.query('SELECT * FROM feedback', function(err, rows){
 				if (err) throw err;
 				test.ok(rows, "rows exist");
				test.done();
 			});
 		});
	});
}