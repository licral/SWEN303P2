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
 ./bin/mongod --storageEngine mmapv1 --dbpath=./data --port 27017
 The website should now be able to connect to the database
 *///////////////////////////////////////////////////////////////////////////////////

router.get('/', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        db.collection('items').find({"user": req.cookies.isLoggedIn}).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
            res.render('account', {
                title: 'Express',
                page : 'Account',
                myProducts: result
            });
        });
    });
});


// This method doesn't display a page, rather it tries to log in a member
// and sends a reply back to the client
router.post('/validate', function (req, res) {
    var username = req.query.username;
    var password = req.query.password;

    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        db.collection('users').find({"username": username, "password": password}).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            if (result.length > 0) {
                res.cookie('isLoggedIn', username, {overwrite: true, httpOnly: false});
                res.send("true");
            } else {
                console.log("Login failed");
                res.send("false");
            }
        });
    });
});

/**
 * NOTE: logout doesn't work on fire fox
 **/
router.post('/logout', function (req, res) {
    res.clearCookie('isLoggedIn');
    res.send("done");
});

router.post('/register', function (req, res) {
    var firstname = req.query.firstname;
    var lastname = req.query.lastname;
    var username = req.query.username;
    var password = req.query.password;

    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log("Logged in");

        db.collection('users').insert(
            {"username": username, "password": password, "firstname": firstname, "lastname": lastname, "items_In_Cart": [], "favourites":[]},
            function (err, result) {
                console.log("Inserted 3 documents into the document collection");

                if (!err) {
                    console.log("New user added");
                    res.cookie('isLoggedIn', username, {overwrite: true, httpOnly: false});
                    res.send("true");
                } else {
                    console.log("Registration failed");
                    res.send("false");
                }
            });
    });

});

router.post('/getItemInCartCount', function (req, res) {
    var username = req.cookies.isLoggedIn;
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        db.collection('users').find({"username": username}).toArray(function (err, result) {
            if (err) {
                throw err;
            }

            if (result.length > 0) {
                console.log(result);
                res.send(String(result[0].items_In_Cart.length));
            } else {
                res.send("0");
            }
        });
    });
});

router.post('/addItemToCart', function (req, res) {
    var username = req.cookies.isLoggedIn;
    var item = req.query.item;
    
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        console.log("Item: " + item);
        db.collection('users').update({"username": username}, { $push: {items_In_Cart: item}});
        console.log("success");
        res.send("success");
    });
});

module.exports = router;
