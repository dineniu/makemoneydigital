var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
//var cors = require('cors');

var publicDir = path.join(__dirname, 'public')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cors());

Genre = require('./models/genre');
Book = require('./models/book');
SolveMedia = require('./solvemedia');
//Connect to DB
mongoose.connect('mongodb://admin:212230@jello.modulusmongo.net:27017/e5rEqazi');
var db = mongoose.connection;

app.get('/',function(req, res){
        var obj = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
	obj = obj.replace("{visivel-captcha}","none");
	 res.send(obj);
});
app.post('/verificar',function(req, res){
	var solvemedia = new SolveMedia('HdETkCNNkpqCIuBAU90dEO4CjZn.5UpT','-6Hb8iRfq3yvLH9Rr80uobcOqswPpMcZ', 'YJzbSgW5YN0b8ECv455mmYoD6Oosza9K');
	solvemedia.verify(req.body.adcopy_response,req.body.adcopy_challenge, req.connection.remoteAddress, function(isValid,errorMessage){
        if (isValid) {
		res.redirect('http://preev.com/btc/brl');
        } else {
                var obj = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
		obj = obj.replace("{visivel-captcha}","block").replace("{mensagem-captcha}", "O captcha esta incorreto, tente novamente.");
	 	res.send(obj);
        }
    });
});
app.post('/verify',function(req, res){
	var solvemedia = new SolveMedia('HdETkCNNkpqCIuBAU90dEO4CjZn.5UpT','-6Hb8iRfq3yvLH9Rr80uobcOqswPpMcZ', 'YJzbSgW5YN0b8ECv455mmYoD6Oosza9K');
	solvemedia.verify(req.body.adcopy_response,req.body.adcopy_challenge, req.connection.remoteAddress, function(isValid,errorMessage){
        if (isValid) {
            res.redirect('http://preev.com/');
        } else {
            var obj = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
		obj = obj.replace("{visivel-captcha}","block").replace("{mensagem-captcha}", "O captcha esta incorreto, tente novamente.");
	 	res.send(obj);
        }
    });
});



app.get('/bitcoin',function(req, res){
	 res.sendFile(path.join(publicDir, 'bitcoin.html'));
});

app.get('/api/genres',function(req, res){
	Genre.getGenres(function(err, genres){
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

app.post('/api/genres',function(req, res){
	var genre = req.body;

	Genre.addGenres(genre, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.get('/api/books',function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id',function(req, res){
	Book.getBookById(req.params._id,function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

var port = process.env.PORT || 8080;
app.listen(port);
