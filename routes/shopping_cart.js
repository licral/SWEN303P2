var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("Cookies: ", req.cookies);
    res.render('shopping_cart', {
        title: 'Express',
        page : 'Shopping Cart'
    });
});

module.exports = router;
