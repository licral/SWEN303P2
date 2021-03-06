var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var browse = require('./routes/browse');
var sell = require('./routes/sell');
var login = require('./routes/login');
var account = require('./routes/account');
var register = require('./routes/register');
var settings = require('./routes/settings');
var shoppingCart = require('./routes/shopping_cart');
var mongoose = require('./routes/mongoose');
var favourites = require('./routes/favourites');
var search = require('./routes/search');
var editItem = require('./routes/editItem');
var checkout = require('./routes/checkout');
var order = require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/browse', browse);
app.use('/sell', sell);
app.use('/login', login);
app.use('/account', account);
app.use('/register', register);
app.use('/settings', settings);
app.use('/shopping_cart', shoppingCart);
app.use('/favourites', favourites);
app.use('/search', search);
app.use('/editItem', editItem);
app.use('/checkout', checkout);
app.use('/order', order);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
