var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/',function(request, response){
	response.send('OK');
});

app.get('/weeds', function(request, response){
	var weeds = ["Medical","Jack","Moby Dick"];
	response.json(weeds);
});
//prueba
module.exports = app;
