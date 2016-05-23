var express = require('express');
var router = express.Router();
var categoryRouter = express.Router({mergeParams: true});
var subCategoryRouter = express.Router({mergeParams: true});
var pageRouter = express.Router({mergeParams: true});


// Connection URL

var Item = require('./mongoose');
var Path = {};



var categories = {
    "Clothing": {
        "Men's Clothing": ["Shirts", "Hoodies & Sweatshirts", "Jackets & Coats", "Sweaters", "Costumes", "Activewear", "Trousers", "Socks", "Suits & Sport Coats", "Vests", "Jeans", "Shorts", "Underwear", "Swim Trunks", "Pyjamas & Robes", "Ponchos", "Kilts"],
        "Women's Clothing": ["Tops & Tees", "Dresses", "Lingerie", "Jackets & Coats", "Skirts", "Sweaters", "Hoodies & Sweatshirts", "Swimwear", "Costumes", "Trousers & Capris", "Socks & Hosiery", "Shorts & Skorts", "Pyjamas & Robes", "Activewear", "Leggings", "Jeans", "Ponchos", "Jumpsuits & Rompers", "Blazers", "Suits", "Bodysuits", "Overalls"],
        "Gender Diverse Clothing": ["Tops & Tees", "Lingerie", "Jackets & Coats", "Skirts", "Sweaters", "Hoodies & Sweatshirts", "Swimwear", "Costumes", "Trousers & Capris", "Shorts & Skorts", "Pyjamas & Robes", "Jeans", "Ponchos", "Jumpsuits & Rompers", "Blazers", "Suits", "Bodysuits", "Overalls"],
        "Children's Clothing": ["Baby Clothes", "Tops", "Bodysuits", "Trousers", "Costumes", "Clothing Sets", "Sweaters", "Hoodies & Sweatshirts", "Jackets & Coats", "Socks", "Shorts", "Activewear", "Pyjamas & Robes", "Underwear", "Swimwear", "Footies & Rompers", "Suits", "Ponchos", "Vests"]
    },
    "Technology": {
        "Gadgets": ["Binoculars", "Cameras"],
        "Computers": ["Desktops", "Laptops"]
    },
    "Arts and Crafts": {
        "Jewellery": ["Earrings", "Necklaces", "Rings"],
        "Fabric": ["Quilts", "Embroidery", "Crochet"],
        "Craft supplies": ["Knitting", "Bakeware", "Jewellery and beading"]
    }
}


/* GET home page. */

router.get('/item/:id', function(req, res){
    id = req.params.id;
    Item.find({'_id' : id}, function(err, data){
        res.render('item', {
            title: 'Express',
            page : data[0].title,
            id : data[0]._id,
            description: data[0].description,
            price: data[0].price,
            category : data[0].category
        });
    });
});

router.get('/image/:id', function(req, res){
    id = req.params.id;
    Item.find({'_id' : id}, 'image.data', function(err, data){
        var img = data[0].image.data;
        res.writeHead(200, {'Content-Type' : 'image/jpg'});
        res.end(img, 'binary');
    });
});

router.get('/:cat/:page', function(req, res){
    var subcats = [];
    cat = req.params.cat;
    console.log(cat);
        for (var category in categories){
        if (cat === category.replace(new RegExp(' ', 'g'), '-').toLowerCase()){
            for (var subcategory in categories[category]){
                subcats.push(subcategory);
            }
            cat = category;
        }
    }
    console.log(cat);
    console.log(subcats);
    page = req.params.page;
    console.log(page);
    var skipVal = ((page-1) * 10);
    console.log(skipVal);
    Item.find({category:{'$regex': cat,$options:'i'}}).skip(skipVal).limit(20).sort({title:1}).exec(function(err, items){
        Item.count({category:{'$regex': cat,$options:'i'}}, function(err, count){
            if (err) throw err;
            res.render('technology', {
                title: cat,
                page : 'Browse ' + cat,
                items:  items,
                count: count,
                start: skipVal,
                categories : [cat],
                subcats: subcats,
            });
        });
    });
});

router.get('/:cat/:subcat/:page', function(req, res){
    var cats = [];
    var subcats = {};
        for (var category in categories){
        if (req.params.cat === category.replace(new RegExp(' ', 'g'), '-').toLowerCase()){
            cats.push(category);
            for (var subcatinarray in categories[category]){
                 if (req.params.subcat === subcatinarray.replace(new RegExp(' ', 'g'), '-').toLowerCase()){
                    cats.push(subcatinarray);
                    subcats = categories[category][subcatinarray];
                }
            }
        }
    }
    console.log(cats);
    console.log(subcats);
    page = req.params.page;
    console.log(page);
    var skipVal = ((page-1) * 10);
    console.log(skipVal);
    Item.find({category: {$all : cats}}).skip(skipVal).limit(20).sort({title:1}).exec(function(err, items){
        Item.count({category: {$all : cats}}, function(err, count){
            if (err) throw err;
            res.render('technology', {
                title: cats[1],
                page : 'Browse ' + cats[1],
                items:  items,
                count: count,
                start: skipVal,
                categories : cats,
                subcats: subcats
            });
        });
    });
});


router.get('/:cat/:subcat/:subsubcat/:page', function(req, res){
    var cats = [];
    var subcats = [];
        for (var category in categories){
        if (req.params.cat === category.replace(new RegExp(' ', 'g'), '-').toLowerCase()){
            cats.push(category);
            for (var subcatinarray in categories[category]){
                 if (req.params.subcat === subcatinarray.replace(new RegExp(' ', 'g'), '-').toLowerCase()){
                    cats.push(subcatinarray);
                    categories[category][subcatinarray].forEach(function(subsubcatinarray){
                        if (req.params.subsubcat === subsubcatinarray.replace(new RegExp(' ', 'g'), '-').toLowerCase()){
                            cats.push(subsubcatinarray);
                        }
                    });
                }
            }
        }
    }
    console.log(cats);
    console.log(subcats);
    page = req.params.page;
    console.log(page);
    var skipVal = ((page-1) * 10);
    console.log(skipVal);
    Item.find({category: {$all : cats}}).skip(skipVal).limit(20).sort({title:1}).exec(function(err, items){
        Item.count({category: {$all : cats}}, function(err, count){
            if (err) throw err;
            res.render('technology', {
                title: cats[2],
                page : 'Browse ' + cats[2],
                items:  items,
                count: count,
                start: skipVal,
                categories : cats,
                subcats: subcats
            });
        });
    });
});

module.exports = router;
