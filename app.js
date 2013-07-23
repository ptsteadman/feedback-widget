var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , feedback = require('./routes/feedback')
  , path = require('path');

var app = express();

// all environments
//app.use(express.basicAuth('pcln', 'pcln'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/', feedback.post);
app.get('/feedback', feedback.get);

app.listen(3003);