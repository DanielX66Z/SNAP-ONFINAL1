//scrip para levantar en heroku
var express  = require('express');
var path      = require('path');
var app      = express();                               
//var morgan = require('morgan');            
//var bodyParser = require('body-parser');    
//var cors = require('cors');
 

app.use(express.static(path.resolve(__dirname, "www")));
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
 console.log("listening to Port", app.get("port"));
});
/*app.use(morgan('dev'));                                        
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(cors());
 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});*/