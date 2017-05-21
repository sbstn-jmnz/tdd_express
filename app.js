var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

var weeds = {
	"Medical":"Some Description",
	"Jack":"Description",
	"Moby Dick": "detdependencies"
};

app.get('/weeds', function(request, response){
	response.json(Object.keys(weeds));
});

app.post('/weeds', urlencode, function(request, response){
	var newWeed = request.body;
	console.log(newWeed);
	weeds[newWeed.name] = newWeed.description;
	response.status(201).json(newWeed.name);
});

app.get('/',function(request, response){
	response.send('OK');
});

module.exports = app;
