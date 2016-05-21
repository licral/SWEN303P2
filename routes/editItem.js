var express = require('express');
var router = express.Router();


// Connection URL

var Item = require('./mongoose');

/* GET home page. */
router.get('/:id', function(req, res){
    id = req.params.id;
    Item.find({'_id' : id}, function(err, data){
        res.render('editItem', {
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

module.exports = router;
