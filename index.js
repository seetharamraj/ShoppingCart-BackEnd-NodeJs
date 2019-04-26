var createError = require('http-errors');
var http=require('http');
const path=require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express=require('express');
var port=process.env.PORT || 7000;
var app=express();
var appRoutes=require('./routes/appRoutes');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var cors= require('cors');

app.use(cors());
mongoose.connect('mongodb://localhost/meanDb',{ useNewUrlParser: true });
var passport =require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// app.use(session({
//     name : 'myname.sid',
//     resave:false,    //
//     saveUninitialized:false,
//     secret:'secret',
//     cookie:{
//       maxAge:36000000,    //milliseconds
//       httpOnly:false,
//       secure:false
//     },
//       store : new MongoStore({mongooseConnection: mongoose.connection})
//   }));
  
app.use(bodyParser.urlencoded({extended : false}));
app.use("/images",express.static(path.join("public/images")));

// app.use(bodyParser.json());

app.use('/',appRoutes);
//require('./passport-config');
// app.use(passport.initialize());
// app.use(passport.session());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });







http.createServer(app).listen(port);
console.log("running",port);
module.exports = app;
