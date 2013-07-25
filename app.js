var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app).listen(3003)
  , io = require('socket.io').listen(server)
  , routes = require('./routes')
  , user = require('./routes/user')
  , feedback = require('./routes/feedback')
  , path = require('path')
  , db = require('./database');

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
app.post('/', function(req,res){
	 console.log(req.body);
	//res.header("Access-Control-Allow-Origin", "http://localhost:8090");
	//res.header("Access-Control-Allow-Origin", "http://localhost:3003");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //res.header('Access-Control-Allow-Headers', 'Content-Type');
  db.addFeedback(req.body, function(err){
  	io.sockets.emit('new');
  	console.log(err);
    if (err) res.send(500);
    if (!err) res.send(200);
  });
});


app.get('/feedback', feedback.get);
app.delete('/feedback', feedback.deleteAll);
app.post('/createTable', feedback.createTable);

