var express = require('express');
var router = express.Router();

// https://github.com/expressjs/cookie-parser
// https://github.com/pillarjs/cookies
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', {
        title: 'Express',
        page : 'Register'
    });
});

module.exports = router;
