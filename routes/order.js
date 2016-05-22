var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var Item = require('./mongoose');

// Connection URL
var url = 'mongodb://localhost:27017/SWEN303';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('placeOrder', {
        title: 'Express',
        page: 'Place Order'
    });
});

module.exports = router;
