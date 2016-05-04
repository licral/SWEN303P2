var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/clothing', function(req, res, next) {
    res.render('clothing', {
        title: 'Express',
        page : 'Browse Clothing'
    });
});

router.get('/technology', function(req, res, next) {
    res.render('technology', {
        title: 'Express',
        page : 'Browse Technology'
    });
});

router.get('/arts_and_crafts', function(req, res, next) {
    res.render('arts', {
        title: 'Express',
        page : 'Browse Arts and Crafts'
    });
});

module.exports = router;
