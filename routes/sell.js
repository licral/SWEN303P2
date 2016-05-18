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
mongoose.connect(url);

var A = require('./mongoose');

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
    a.description = req.body.description;
    a.price = req.body.price;
    // ADD USER
    // ADD TIMESTAMP
    a.stock = req.body.quantity;
    a.category = req.body.category;
    // ADD REVIEWS
    a.image.data = req.file.buffer;
    a.image.contentType = 'image/jpg';
    a.save(function(err){
        if(err) throw err;
        console.log('Item added to database');
        res.redirect("/sell/success");
    });
});

router.get('/success', function(req, res){
   res.render('success', {
       message: "Item has been successfully added"
   });
});

// METHOD OF GETTING THE IMAGE AND RETURNING IT
router.get('/uploads/fullsize/:id', function(req, res){
    id = req.params.id;
    A.find({'_id' : id}, 'image.data', function(err, data){
        var img = data[0].image.data;
        res.writeHead(200, {'Content-Type' : 'image/jpg'});
        res.end(img, 'binary');
    });
});

router.get('/allitems', function(req,res){
    A.distinct("_id", function(err, imageIDs) {
        if (err) throw err;

        // object of all the users
        console.log(imageIDs);
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