var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var Item = require('./mongoose');

// Connection URL
var url = 'mongodb://localhost:27017/SWEN303';

// https://github.com/expressjs/cookie-parser
// https://github.com/pillarjs/cookies
/* GET home page. */
router.get('/', function(req, res, next) {
    var username = req.cookies.isLoggedIn;
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        // Get items array in cart
        db.collection('users').find({"username": username}).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
            // Convert results to objectid array
            var myArray = [];
            var myQuantity = [];
            for(var i=0; i<result[0].items_In_Cart.length; i++) {
                myArray.push(ObjectId(result[0].items_In_Cart[i].itemID));
                myQuantity.push(Number(result[0].items_In_Cart[i].quantity));
            }

            // Find items
            db.collection('items').find({_id: { $in: myArray}}).toArray(function (err2, resultItems) {
                if (err2) {
                    throw err2;
                }
                console.log("Result: " + resultItems);
                res.render('checkout', {
                    title: 'Express',
                    page : 'Checkout Cart',
                    items: resultItems,
                    user: result[0],
                    quantityList: myQuantity
                });
            });
        });
    });
});


module.exports = router;
