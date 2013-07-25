var mysql = require('mysql');
var config = require('../config');
var db = require('../database');

exports.testTesting = function(test){
	test.ok(true, "this should work");
	test.done();
}


exports.testSockets = function(test){
  db.addFeedback('ok', function(err){
    test.ok(!err, "Data added, did autoUpdate work?");
    test.done();
  });
}