 // Node js  Frameworks    //sanchit
var express = require('express');
var env = require('dotenv').config()
var ejs = require('ejs');

var path = require('path');
// handlers for request with different HTTP verbs at diffrent url path
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
 
// mongoose connection //jitendra
mongoose.connect('mongodb+srv://Sanchit:Gupta12345@cluster0.tj23u.mongodb.net/sign_up?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});  //Jitendra

// user assigned a unique session
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// set view engine ejs 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	

// parses json, url encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//get the path of current directory
app.use(express.static(__dirname + '/views'));

// import routers
var index = require('./routes/index');
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

// server listen port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});
