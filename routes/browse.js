var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('browse', {
        title: 'Express',
        page : 'Browse'
    });
});

module.exports = router;