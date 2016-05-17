var express = require('express');
var router = express.Router();

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
    Category : ObjectId,
    Price : Number,
    Quanitity : Number,
    Description : String,
    Image : ObjectId,
    Timestamp : Date,
    Reviews : ObjectId
});

router.post('/sell', function (req, res) {
    var newItem = {
            seller = getCookie("isLoggedIn"),
        itemName = req.query.sellItemName,
        category = req.query.category,
        price = req.query.sellPrice,
        stock = req.query.quantity,
        description = req.query.itemDescription,
        image = req.query.image,
        timestamp = new Date(),
        reviews = "not implemented"
}


    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.error(err);
            throw err;
        }

        db.collection('items').insert(
            {newItem},
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
