var mysql = require('mysql');

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