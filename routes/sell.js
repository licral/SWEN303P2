var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('sell', {
        title: 'Express',
        page : 'Sell'
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