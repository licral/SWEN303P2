var express = require('express');
var router = express.Router();

var Item = require('./mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
    Item.find({}, function(err, data){
        console.log(data);
        res.render('index', {
            title: 'Express',
            page : 'Home',
            items: data
        });        
    });
    
});

module.exports = router;
