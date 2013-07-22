var mysql = require('mysql');
var config = require('../config')

exports.testTesting = function(test){
	test.ok(true, "this should work");
	test.done();
}

exports.testDB = function(test){
  var connection = mysql.createConnection({
  	host: config.mysql.host,
  	user: config.mysql.user,
  	password: config.mysql.password,
  	port: config.mysql.port
  });

  connection.connect(function(err){
  	if (err) throw err;
  	connection.query("USE " + config.mysql.db);
 		connection.query("INSERT INTO feedback VALUES('2', 'YO')", function(err, result){
 			if (err) throw err;
 			connection.query('SELECT * FROM feedback', function(err, rows){
 				if (err) throw err;
 				console.log(rows);
 				test.ok(rows, "rows exist");
				test.done();
 			});
 		});
	});
}