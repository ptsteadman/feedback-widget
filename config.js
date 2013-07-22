var config = {}

config.mysql = {};

config.mysql.host = process.env.MYSQL_HOST ||'host';
config.mysql.user = process.env.MYSQL_USER || 'user';
config.mysql.password = process.env.MYSQL_PASSWORD || 'password';
config.mysql.port = process.env.MYSQL_PORT || '3306';

module.exports = config;