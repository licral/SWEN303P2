var express = require('express');
var router = express.Router();

// Connection URL
var url = 'mongodb://localhost:27017/SWEN303';

var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage});
router.use(upload.single('image'));

var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(url);

var schema = new Schema({
    img: {
        id: Number,
        data: Buffer,
        contentType: String
    }
});

var A = mongoose.model('image', schema);

var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('sell', {
        title: 'Express',
        page : 'Sell'
    });
});

router.post('/add_item', function(req, res){
    var a = new A();
    console.log(req.file);
    a.img.data = req.file.buffer;
    a.img.contentType = 'image/jpg';
    a.save(function(err){
        if(err) throw err;
        console.log('saved img to mongo');
        res.redirect("/sell/uploads/fullsize/" + a._id);
    });
});

// METHOD OF GETTING THE IMAGE AND RETURNING IT
router.get('/uploads/fullsize/:id', function(req, res){
    id = req.params.id;
    A.find({'_id' : id}, 'img.data', function(err, data){
        console.log(data[0].img.data);
        var img = data[0].img.data;
        res.writeHead(200, {'Content-Type' : 'image/jpg'});
        res.end(img, 'binary');
    });
});

module.exports = router;



// var Item = new Schema({
// Seller : ObjectId
// ItemName : String
// Category : ObjectId
// Price : Number
// Quanitity : Number
// Date : Date
// Photograph : ObjectId?
// Description : String
// });

// app.post('/sell', function(req, res){
//     new Item({
//         Seller  : (get username)
//         ItemName : req.body.sellItemName
//         Category : req.body.category
//         Price   : req.body.sellPrice
//         Quantity : req.body.quantity
//         Date : new Date()
//         Photograph : (get photo???)
//         Description : req.body.itemDescription
//
//
//     }).save(function(err, prd){
//         if(err) res.json(err);
//         else    res.send("Item successfully listed!");
//     });
// });