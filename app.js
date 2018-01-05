var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash        = require('req-flash');
var index = require('./routes/index');
var apis  = require('./routes/apis');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', 8000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret: 'secret'}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/'   , index);
app.use('/api', apis);

app.use(checkAuth);
app.use(catch404);
app.use(errorHandler);

app.listen(8000, function() {
    console.log('Example app listening on port 8000!');
});
module.exports = app;


function checkAuth(req, res, next) {
    if ((req.url).indexOf('api') > 0 && (!req.session || !req.session.authenticated)) {
        res.render('login', { status: 403 });
    }
    next();
}
function catch404(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}
function errorHandler(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
}