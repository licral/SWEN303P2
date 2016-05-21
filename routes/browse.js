var express = require('express');
var router = express.Router();


// Connection URL

var Item = require('./mongoose');

/* GET home page. */
router.get('/clothing', function(req, res, next) {
    res.render('clothing', {
        title: 'Express',
        page : 'Browse Clothing'
    });
});

router.get('/technology', function(req, res, next) {
    Item.find({}, function(err, items) {
        if (err) throw err;

        res.render('technology', {
            title: 'Express',
            page : 'Browse Technology',
            items: items
        });
    });

});

router.get('/arts_and_crafts', function(req, res, next) {
    res.render('arts', {
        title: 'Express',
        page : 'Browse Arts and Crafts'
    });
});

router.get('/item/:id', function(req, res){
    id = req.params.id;
    Item.find({'_id' : id}, function(err, data){
        res.render('item', {
            title: 'Express',
            page : data[0].title,
            id : data[0]._id,
            description: data[0].description,
            price: data[0].price
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
module.exports = router;
