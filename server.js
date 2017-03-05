var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cookieParser = require('cookie-parser');

app.use(bodyParser());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/src'));


var nunjucks = require('nunjucks');
nunjucks.configure(__dirname + '/src', {
	autoescape: true,
	cache: false,
	express: app
});


app.use('/', require('./app/router'));


app.listen(require('./app/config.js')
	.port);
console.log('Server started!');
