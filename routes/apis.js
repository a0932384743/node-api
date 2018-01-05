var express = require('express');
var fs = require('fs');

var router = express.Router();

router.get('/', function(req, res) {
    res.json({
        message: "call api"
    });
});

router.get('/loadFile', function(req, res) {
    fs.exists('./doc/log.txt', (exists) => {
        if (!exists) {
            fs.writeFile('./doc/log.txt', '', function(err) {
                if (err) {
                    res.json({
                        result: false,
                        err: err
                    });
                }
                fs.readFile('./doc/log.txt', 'utf-8', (err, fd) => {
                    if (err) {
                        res.json({
                            result: false,
                            err: err
                        });
                    } else {
                        res.json({
                            result: true,
                            data: fd
                        });
                    }


                });

            });
        } else {
            fs.readFile('./doc/log.txt', 'utf-8', (err, fd) => {
                if (err) {
                    res.json({
                        result: false,
                        err: err
                    });
                } else {
                    res.json({
                        result: true,
                        data: fd
                    });
                }

            });
        }

    });

});

router.get('/writeFile', function(req, res) {
    var log = req.param('log');
    fs.writeFile('./doc/log.txt', (log || ''), function(err) {
        if (err) {
            res.json({
                result: false,
                err: err
            });
        }
        console.log('Saved.');
        fs.readFile('./doc/log.txt', 'utf-8', function(err, data) {
            if (err) {
                res.json({
                    result: false,
                    err: err
                });
            } else {
                res.json({
                    result: true
                });
            }
        });
    });
});

module.exports = router;