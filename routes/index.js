var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.redirect('/login');
});

router.get('/login', function(req, res, next) {
    res.render('login', { flash: req.flash()});
});

router.post('/login', function(req, res, next) {
    // you might like to do a database look-up or something more scalable here
    if (req.body.username && req.body.username === 'admin' && req.body.password && req.body.password === 'admin') {
        req.session.authenticated = true;
        res.redirect('/api');
    } else {
        req.flash('error', 'Username and password are incorrect');
        res.redirect('/login');
    }
});

router.get('/logout', function(req, res, next) {
    delete req.session.authenticated;
    res.redirect('/login');
});

module.exports = router;