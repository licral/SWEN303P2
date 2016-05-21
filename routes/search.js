var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    var search = req.body.search;
    console.log(search);
    res.render('search', {
        title: 'Express',
        page : 'Results'
    });
});

module.exports = router;