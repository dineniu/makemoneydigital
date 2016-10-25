var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');


var publicDir = path.join(__dirname, 'public')
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

var ip_addr = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';
var port    = process.env.OPENSHIFT_NODEJS_PORT || '8080';
// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/t1234';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}


//Connect to DB
mongoose.connect(OPENSHIFT_MONGODB_DB_URL+OPENSHIFT_APP_NAME);
var db = mongoose.connection;

app.get('/',function(req, res){
	 res.sendFile(path.join(publicDir, 'index.html'));
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

app.listen(port);
console.log("Porta: "+port);