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
    connection.query('USE fbdb', function(err){
      console.log(err);
    });
    connection.query('SELECT * FROM feedback', function(err, rows){
      console.log(err);
      connection.end();
      callback(rows);
      });
  });
}

exports.addFeedback = function(data, callback){
  pool.getConnection(function(err, connection){
    if (err) throw err;
    connection.query('USE fbdb');
    var now = new Date();
   	connection.query("INSERT INTO feedback SET text = ?, date = ?, satisfaction = ?, site = ?", [data['free-text'], now.toString(), 100, 'airP2'], function(err, result){
   		connection.end();
   		callback(err);
   	});
  });
}

exports.deleteAll = function(callback){
  console.log('deleteTest');  
  pool.getConnection(function(err, connection){
    if (err) throw err;
    console.log(config.mysql.db)
    connection.query('USE ' + config.mysql.db);
    connection.query("DELETE FROM feedback", function(err, result){
      console.log('should be deleted');
      connection.end();
      callback(err);
    })
  })
}

exports.createTable = function(name, callback){
    pool.getConnection(function(err, connection){
    if (err) throw err;
    connection.query('USE ' + config.mysql.db);
    connection.query("CREATE TABLE " + name + 
      "(id INT(11) AUTO_INCREMENT, " +
      "text TEXT, " + 
      "date TEXT, " +
      "satisfaction INT(11), " +
      "site TEXT, " +
      "PRIMARY KEY (id));", function(err, result){
      connection.end();
      callback(err);
    });
  });


}

