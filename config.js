var config = {}
//test
config.mysql = {};

config.mysql.host = process.env.MYSQL_HOST ||'host';
config.mysql.user = process.env.MYSQL_USER || 'user';
config.mysql.password = process.env.MYSQL_PASSWORD || 'password';
config.mysql.port = process.env.MYSQL_PORT || '3306';
config.mysql.db = process.env.MYSQL_DB || 'db';

module.exports = config;