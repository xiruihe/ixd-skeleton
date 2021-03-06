
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var bodyParser = require("body-parser");

var index = require('./routes/index');
var login = require("./routes/login");
var altIndex = require("./routes/altbIndex");
var help = require("./routes/help");
var add = require("./routes/add");
var timer = require("./routes/timer");
var data = require("./routes/data");
var premade= require("./routes/premade");
// Example route
// var user = require('./routes/user');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get("/", login.viewLogin);
app.get('/index', index.view);
app.get('/altindex', altIndex.view);
app.get('/premade', premade.view);
app.get("/help", help.viewHelpHB);
app.get("/add", add.viewAddHB);
app.get("/getdata", data.getData);
app.get("/timer/:id", timer.viewTimer);

app.post("/add",add.addData);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
