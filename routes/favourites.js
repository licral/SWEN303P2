var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

var Item = require('./mongoose');

// Connection URL
var url = 'mongodb://localhost:27017/SWEN303';

/* GET home page. */
router.get('/', function(req, res, next) {
    var username = req.cookies.isLoggedIn;
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        db.collection('users').find({"username": username}).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            console.log("Hellowwwwwwww")
            console.log(result[0]);
            console.log("Worldddddddd")
            res.render('favourites', {
                title: 'Express',
                page: 'Favourites',
                items: result[0].favourites
            });
        });
    });
});

router.post('/add', function (req, res) {
    var username = req.cookies.isLoggedIn;
    var item = req.query.item;
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        db.collection('users').update({"username": username}, { $push: {favourites: item}});
        console.log("Added to Favourites");
        res.send("success");
    });
});

module.exports = router;
