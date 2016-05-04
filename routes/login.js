var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("Cookies: ", req.cookies);
    res.render('login', {
        title: 'Express',
        page : 'Log In'
    });
});

module.exports = router;
