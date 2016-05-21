var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('favourites', {
        title: 'Express',
        page : 'Favourites'
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
        console.log("2");
        //db.collection('users').update({"username": username}, { $push: {items_In_Cart: item}});
        console.log("success");
        res.send("success");
    });
});

module.exports = router;
