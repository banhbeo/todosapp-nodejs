var http     = require('http');
var path     = require('path');
var express  = require('express');
var mongoose = require('mongoose');
var routes   = require('./routes/index.js');


var app = express();

mongoose.connect('mongodb://localhost/todosapp');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to database successfully.');
});

var Todo = app.Todo = require('./models/todo')(mongoose);

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.use(express.logger());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

