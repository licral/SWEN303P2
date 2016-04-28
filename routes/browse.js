var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/clothing', function(req, res, next) {
    res.render('clothing', {
        title: 'Express',
        page : 'Browse Clothing'
    });
});

module.exports = router;
