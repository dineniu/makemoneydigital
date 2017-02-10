var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var publicDir = path.join(__dirname, 'public')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
	if(req.query.lang == "pt"){
	  
	}
	 res.send(obj);
});
app.get('/pt',function(req, res){
	var string = encodeURIComponent('pt');
    res.redirect('/?lang=' + string);
});

var port = process.env.PORT || 8080;
app.listen(port);
