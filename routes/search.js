var express = require('express');
var router = express.Router();

var Item = require('./mongoose');

/* GET home page. */
router.post('/:page', function(req, res, next) {
    var sortMethod = req.query.sortMethod;
    var sortOrder = req.query.sortOrder;
     if (sortOrder == null){
        sortOrder = 1;
    }
    if (sortMethod == null){
        sortMethod = 'title';
    }
    var page = req.params.page;
    var search = req.body.search;
    var skipVal = ((page-1) * 20);

    Item.find({'title' : {'$regex' : search, '$options' : 'i'}}).skip(skipVal).limit(20).sort({title:1}).exec(function(err, items){
        Item.count({'title' : {'$regex' : search, '$options' : 'i'}}, function(err, count){
            if (err) throw err;
            res.render('search', {
                title: 'Express',
                page : 'Results',
                items:  items,
                count: count,
                start: skipVal,
                query: search,
                url: req.url
            });
        });
    });
});


router.get('/:page', function(req, res){
    var sortMethod = req.query.sortMethod;
    var sortOrder = req.query.sortOrder;
     if (sortOrder == null){
        sortOrder = 1;
    }
    if (sortMethod == null){
        sortMethod = 'title';
    }
    var search = req.query.query;
    page = req.params.page;
    var skipVal = ((page-1) * 20);
    var sortQuery = {};
    sortQuery[sortMethod] = sortOrder;
    Item.find({'title' : {'$regex' : search, '$options' : 'i'}}).skip(skipVal).limit(20).sort(sortQuery).exec(function(err, items){
        Item.count({'title' : {'$regex' : search, '$options' : 'i'}}, function(err, count){
            if (err) throw err;
            res.render('search', {
                title: 'Express',
                page : 'Results',
                items:  items,
                count: count,
                start: skipVal,
                query: search,
                url: req.url
            });
        });
    });
});

module.exports = router;