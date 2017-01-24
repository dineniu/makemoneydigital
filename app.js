var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');


var publicDir = path.join(__dirname, 'public')
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');
Solvemedia = require('./lib/solvemedia');
//Connect to DB

mongoose.connect('mongodb://usuario:usuario123@172.30.165.103:27017/testedb');
//mongoose.connect(OPENSHIFT_MONGODB_DB_URL + OPENSHIFT_APP_NAME);
var db = mongoose.connection;




app.post('/validate', function(req, res) {
    var solvemedia = new Solvemedia('HdETkCNNkpqCIuBAU90dEO4CjZn.5UpT','-6Hb8iRfq3yvLH9Rr80uobcOqswPpMcZ', 'YJzbSgW5YN0b8ECv455mmYoD6Oosza9K');
    
    solvemedia.verify(req.body.adcopy_response,req.body.adcopy_challenge, req.connection.remoteAddress, function(isValid,errorMessage){
        if (isValid) {
            res.send('Hi ' + req.body.name + ', Solvemedia told me that you are not a robot!!');
        } else {
            // Redisplay the form.
            res.render('register', {
                layout: false,
                locals: {
                    name        : req.body.name,
                    captcha     : solvemedia.toHTML(),                  
                    errorMessage: errorMessage
                }
            });                            
        }
    });
});        

app.get('/',function(req, res){
	var solvemedia = new Solvemedia('HdETkCNNkpqCIuBAU90dEO4CjZn.5UpT','-6Hb8iRfq3yvLH9Rr80uobcOqswPpMcZ', 'YJzbSgW5YN0b8ECv455mmYoD6Oosza9K');
	 res.send(solvemedia.toHTML());
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
