var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

// Connection URL
var url = 'mongodb://localhost:27017/SWEN303';

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
});

router.post('/saveChanges', function(req, res){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        var objID = ObjectId(req.body.Itemid);
        db.collection('items').update({"_id": objID},
            {
                $set: {
                    "title": req.body.itemName,
                    "description": req.body.description,
                    "stock": req.body.quantity,
                    "price": req.body.price,
                    "category": [req.body.category1Sel, req.body.category2Sel, req.body.category3Sel]
                }
            });

        res.redirect("/account");
    });
});


module.exports = router;
