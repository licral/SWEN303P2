
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
    img: {
        id: Number,
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Image', schema);