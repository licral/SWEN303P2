var express = require('express');
var router = express.Router();


// Connection URL

var Item = require('./mongoose');

/* GET home page. */

router.get('/item/:id', function(req, res){
    id = req.params.id;
    Item.find({'_id' : id}, function(err, data){
        res.render('item', {
            title: 'Express',
            page : data[0].title,
            id : data[0]._id,
            description: data[0].description,
            price: data[0].price,
            category : data[0].category
        });
    });
});

router.get('/image/:id', function(req, res){
    id = req.params.id;
    Item.find({'_id' : id}, 'image.data', function(err, data){
        var img = data[0].image.data;
        res.writeHead(200, {'Content-Type' : 'image/jpg'});
        res.end(img, 'binary');
    });
})

router.get('/:cat/:page', function(req, res){
    cat = req.params.cat;
    console.log(cat);
    page = req.params.page;
    console.log(page);
    var skipVal = ((page-1) * 10);
    console.log(skipVal);
    Item.find({category:{'$regex': cat,$options:'i'}}).skip(skipVal).limit(20).sort({title:1}).exec(function(err, items){
        Item.count({category:{'$regex': cat,$options:'i'}}, function(err, count){
            if (err) throw err;
            res.render('technology', {
                title: cat,
                page : 'Browse ' + cat,
                items:  items,
                count: count,
                start: skipVal
            });
        });
    });
})

module.exports = router;
