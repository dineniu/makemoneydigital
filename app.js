var express    = require('express'),
    http       = require('http');
    
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
Solvemedia = require('solvemedia');


var publicDir = path.join(__dirname, 'public')
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-locals'));

Genre = require('./models/genre');
Book = require('./models/book');

//Connect to DB

mongoose.connect('mongodb://usuario:usuario123@172.30.165.103:27017/testedb');
//mongoose.connect(OPENSHIFT_MONGODB_DB_URL + OPENSHIFT_APP_NAME);
var db = mongoose.connection;

app.get('/(validate)?', function(req, res) {

    var solvemedia = new Solvemedia('PUBLIC_KEY','PRIVATE_KEY', 'AUTHENTICATION_KEY');
    res.render('register', {
        layout: false,
        locals: {
            name        : '',
            captcha     : solvemedia.toHTML(), 
            errorMessage: ''
                
        }
    });
});

app.post('/validate', function(req, res) {
    var solvemedia = new Solvemedia('PUBLIC_KEY','PRIVATE_KEY', 'AUTHENTICATION_KEY');
    
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

var port = process.env.PORT || 8080;
app.listen(port);
