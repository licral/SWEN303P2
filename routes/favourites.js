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
            res.render('favourites', {
                title: 'Express',
                page: 'Favourites',
                items: result[0].favourites
            });
        });
    });
});

router.post('/addToFavourites', function (req, res) {
    var username = req.cookies.isLoggedIn;
    var id = req.query.id;
    var title = req.query.title;
    console.log(title);
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        db.collection('users').find({"username": username}).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            var found = -1;
            for(var i = 0; i < result[0].favourites.length; i++){
                if(result[0].favourites[i].id == id){
                    found = i;
                }
            }
            if(found >= 0){
                console.log("Cannot add duplicate entry");
                res.send("0");
            }
            else{
                db.collection('users').update({"username": username}, { $push: {favourites: {id: id, title: title}}});
                console.log("Added to Favourites");
                res.send("success");
            }
        });
    });
});

module.exports = router;
