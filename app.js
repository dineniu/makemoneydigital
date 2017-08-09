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


app.get('/ip',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'ip.html'), 'utf8');
    res.send(obj);
});

app.get('/faucets',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'faucets.html'), 'utf8');
    res.send(obj);
});

app.get('/apps',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'apps.html'), 'utf8');
    res.send(obj);
});

//Bonus faucet
app.get('/faucetbonusbitcoin',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'faucetbonusbitcoin.html'), 'utf8');
    res.send(obj);
});
app.get('/converter',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'converter.html'), 'utf8');
    res.send(obj);
});

app.get('/conversor',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'conversor.html'), 'utf8');
    res.send(obj);
});

app.get('/tutorialbonusbitcoin',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'tutorialbonusbitcoin.html'), 'utf8');
    res.send(obj);
});

app.get('/xapo-list-faucet',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'xapolistfaucet.html'), 'utf8');
    res.send(obj);
});

app.get('/bitcoincollector',function(req,res){
    var request = require('request');

	request({
  	method: 'POST',
  	url: 'https://v2.api.xapo.com/accounts/id/transactions?to=to&amount=amount&currency=currency&notes=notes&type=type',
  	headers: {
    	'Authorization': 'Bearer b5e7f3e9-e2f2-460b-a741-b0f7f39f15db'
  	},
  		body: "{  \"to\": \"3JQoqBrGaQ2r6tZS68fCdKA5j6mwGx2TFk\",  \"amount\": 1,  \"currency\": \"SAT\",  \"notes\": \"Testing\",  \"type\": \"pay\"}"
	}, function (error, response, body) {
  	console.log('Status:', response.statusCode);
  	console.log('Headers:', JSON.stringify(response.headers));
  	console.log('Response:', body);
	});
});

var port = process.env.PORT || 8080;
app.listen(port);
