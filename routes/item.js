var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/SWEN303';

////////////////////////////////////////////////////////////////////////////////////
/* Instructions to get Mongo working on Vic lab computers
 1. Download the correct version from https://www.mongodb.org/downloads
 2. Extract to any folder
 3. In the extracted folder, create a new folder called "data" (this will hold the data stored in the database)
 4. Open a terminal in the extracted folder
 5. Run the command "./bin/mongod --storageEngine mmapv1 --dbpath=./data --port 27017" to start the database server

 The website should now be able to connect to the database
 *///////////////////////////////////////////////////////////////////////////////////

var Item = new Schema({
    Seller : ObjectId,
    ItemName : String,
    Category1 : ObjectId,
    Category2 : ObjectId,
    Category3 : ObjectId,
    Price : Number,
    Quantity : Number,
    Description : String,
    Image : ObjectId,
    Timestamp : Date,
    unitsSold : Number,
    MoneyMade : Number,
    Reviews : ObjectId
});

router.post('/add_item', function (req, res) {
        var seller = getCookie("isLoggedIn");
        var itemName = req.query.sellItemName;
        var category1 = req.query.category1;
        var category2 = req.query.category2;
        var category3 = req.query.category3;
        var price = req.query.sellPrice;
        var stock = req.query.quantity;
        var unitsSold = req.query.unitsSold;
        var MoneyMade = req.query.MoneyMade;
        var description = req.query.itemDescription;
        var image = req.query.image;
        var timestamp = new Date();
        var reviews = "not implemented";



    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.error(err);
            throw err;
        }

        db.collection('items').insert(
            {"seller": seller, "itemName": itemName, "category":category, "price":price, "stock": stock, "description": description,
                "image": image, "timestamp": timestamp, "reviews": reviews, "unitsSold": 0, "MoneyMade": 0},
            function (err, result) {
                console.log("Inserted 3 documents into the document collection");

                if (!err) {
                    console.log("New item added");
                } else {
                    console.log("Item listing failed");
                    res.send("false");
                }
            });
    });

});


module.exports = router;
