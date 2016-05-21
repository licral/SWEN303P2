var express = require('express');
var router = express.Router();


// Connection URL

var Item = require('./mongoose');

/* GET home page. */
router.get('/:id', function(req, res){
    id = req.params.id;
    Item.find({'_id' : id}, function(err, data){
        console.log(data);
        res.render('editItem', {
            title: 'Express',
            page : data[0].title,
            item : data[0]
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
