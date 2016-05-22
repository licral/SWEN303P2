var express = require('express');
var router = express.Router();

var Item = require('./mongoose');

/* GET home page. */
router.post('/', function(req, res, next) {
    var search = req.body.search;
    Item.find({'title' : {'$regex' : search, '$options' : 'i'}}, function(err, result){
        console.log(result);
        if (err) throw err;
        res.render('search', {
            title: 'Express',
            page : 'Results',
            items : result,
            query : search
        });
    });
});

module.exports = router;