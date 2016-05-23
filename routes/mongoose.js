
// Connection URL
var url = 'mongodb://localhost:27017/SWEN303';

var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage});

var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.createConnection(url);

var schema = new Schema({
    title: String,
    description : String,
    price : Number,
    image: {
        data: Buffer,
        contentType: String
    },
    user: String,
    timestamp: Date,
    stock: Number,
    category : [String],
    reviews : Array,
    unitsSold : Number,
    MoneyMade : Number
});

module.exports = mongoose.model('item', schema);