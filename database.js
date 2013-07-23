var mysql = require('mysql')
var config = require('./config');

var pool = mysql.createPool({
  	host: config.mysql.host,
  	user: config.mysql.user,
  	password: config.mysql.password,
  	port: config.mysql.port
});

exports.getAllFeedback = function(callback){
	pool.getConnection(function(err, connection){
    if (err) throw err;
    connection.query('USE fbdb');
    connection.query('SELECT * FROM feedback', function(err, rows){
      if (err) throw err;
      callback(rows);
      connection.end();
      });
  });
}

exports.addFeedback = function(data, callback){
  pool.getConnection(function(err, connection){
    if (err) throw err;
    connection.query('USE fbdb');
   	connection.query("INSERT INTO feedback VALUES('2', '" + data['free-text'] + "')", function(err, result){
   		callback(err);
   		connection.end();
   	});
  });
}