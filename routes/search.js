var express = require('express');
var router = express.Router();

var Item = require('./mongoose');

/* GET home page. */
router.post('/:page', function(req, res, next) {
    var page = req.params.page;
    var search = req.body.search;
    var skipVal = ((page-1) * 10);

    Item.find({'title' : {'$regex' : search, '$options' : 'i'}}).skip(skipVal).limit(20).sort({title:1}).exec(function(err, items){
        Item.count({'title' : {'$regex' : search, '$options' : 'i'}}, function(err, count){
            if (err) throw err;
            res.render('search', {
                title: 'Express',
                page : 'Results',
                items:  items,
                count: count,
                start: skipVal,
                query: search
            });
        });
    });
});

module.exports = router;