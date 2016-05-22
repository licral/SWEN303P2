var express = require('express');
var router = express.Router();

var Item = require('./mongoose');

var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/SWEN303';


/* GET home page. */
router.get('/', function(req, res, next) {
    var Users;
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.error(err);
            throw err;
        }
        Item.count({}, function(error, numOfItems) {
            db.collection('users').count({}, function(error, numOfUsers) {
                Item.find({}, function(err, data){
                    res.render('index', {
                        title: 'Express',
                        page : 'Home',
                        items: data,
                        users: numOfUsers,
                        itemCount: numOfItems
                    });
                }).sort({$natural : -1}).limit(5);
            });

        });
    })
});

module.exports = router;
