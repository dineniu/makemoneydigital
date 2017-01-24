
var express    = require('express'),
    http       = require('http');
    Solvemedia = require('../lib/solvemedia');


var app = express();

//render
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-locals'));

//Express config
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.json());
app.use(express.urlencoded());

app.get('/(validate)?', function(req, res) {

    var solvemedia = new Solvemedia('HdETkCNNkpqCIuBAU90dEO4CjZn.5UpT','-6Hb8iRfq3yvLH9Rr80uobcOqswPpMcZ', 'YJzbSgW5YN0b8ECv455mmYoD6Oosza9K');
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
var port = process.env.PORT || 8080;
app.listen(port);
//Launch the HTTP server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
