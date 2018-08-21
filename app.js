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

app.get('/freebitcoin',function(req, res){
    	 res.redirect("https://freebitco.in/?r=2080502");
});

app.get('/coinbase',function(req, res){
    	 res.redirect("https://www.coinbase.com/join/56af7610fa5de309f4000257");
});


app.get('/freebitcoin-download',function(req, res){
	var obj = fs.readFileSync(path.join(publicDir, 'assets/app-release.apk'), 'utf8');
    	 res.send(fs.createWriteStream(obj);
});

app.get('/pt',function(req, res){
	var string = encodeURIComponent('pt');
    res.redirect('/?lang=' + string);
});


app.get('/ip',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'ip.html'), 'utf8');
    res.send(obj);
});

app.get('/ipbr',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'ipbr.html'), 'utf8');
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

app.get('/apps-pt',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'apps-pt.html'), 'utf8');
    res.send(obj);
});

app.get('/apps-steem',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'apps-steem.html'), 'utf8');
    res.send(obj);
});

//Bonus faucet
app.get('/privacy-policy-recorder',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'privacypolicyrecorder.html'), 'utf8');
    res.send(obj);
});

app.get('/freebitcoin',function(req, res){
    var obj = fs.readFileSync(path.join(publicDir, 'freebitcoin.html'), 'utf8');
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
    var obj = fs.readFileSync(path.join(publicDir, 'bitcoincollector.html'), 'utf8');
    res.send(obj);
});

var port = process.env.PORT || 8080;
app.listen(port);
