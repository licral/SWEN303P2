{
    var MongoClient = require('mongodb').MongoClient;

// Connection URL
    var url = 'mongodb://localhost:27017/SWEN303';

    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        /*********************************************************************************
         * 10 items
         *********************************************************************************/
        db.collection('items').insert({
            "_id": 1,
            "user": 1,
            "title": "Digital Camera",
            "description": "Some description",
            "price": 12.90,
            "image": "some image",
            "timestamp": 1232165821544,
            "stock": 3,
            "category": "Technology",
            "reviews": []
        });


        /*********************************************************************************
         * 2 users
         *********************************************************************************/
        db.collection('users').insert({
            "_id": 1,
            "username": "admin",
            "password": "123",
            "firstname": "John",
            "lastname": "Green",
            "bank_Account": 12345678,
            "previous_Purchases": [2],
            "selling_Items": [1, 3, 4, 7, 8, 9],
            "favourite_Items": [6],
            "recently_Viewed_Items": [5, 6, 2],
            "reviews": []
        });

        db.collection('users').insert({
            "_id": 2,
            "username": "user",
            "password": "123",
            "firstname": "Sally",
            "lastname": "Smith",
            "bank_Account": 12345678,
            "previous_Purchases": [3, 7],
            "selling_Items": [2, 5, 6, 10],
            "favourite_Items": [1, 9],
            "recently_Viewed_Items": [3, 7, 1, 9],
            "reviews": []
        });


        /*********************************************************************************
         * 0 reviews
         *********************************************************************************/
        console.log("Done");
    });
}