var config = {}
//test
config.mysql = {};

config.mysql.host = process.env.MYSQL_HOST ||'feedback-widget.czwvwkbas6cq.us-west-2.rds.amazonaws.com';
config.mysql.user = process.env.MYSQL_USER || 'priceline';
config.mysql.password = process.env.MYSQL_PASSWORD || 'priceline';
config.mysql.port = process.env.MYSQL_PORT || '3306';
config.mysql.db = process.env.MYSQL_DB || 'fbdb';

module.exports = config;