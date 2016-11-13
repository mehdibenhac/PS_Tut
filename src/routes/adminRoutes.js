var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var Books = [{
    title: 'Twenty Thousand Leagues Under the Sea',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
}, {
    title: 'Sandokan: The Pirates of Malaysia',
    genre: 'Historical Fiction',
    author: 'Emilio Salgari',
    read: false
}, {
    title: 'Kharmic Rebound',
    genre: 'Science Fiction',
    author: 'Aaron Lee Yeager',
    read: false
}, {
    title: 'Harry Potter and the Prisoner of Azkaban',
    genre: 'Science Fiction Fantasy',
    author: 'J.K. Rowling',
    read: false
}];

var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(Books, function (err, results) {
                    console.log(results);
                    res.send();
                    db.close();
                });
            });
        });

    return adminRouter;
};

module.exports = router;