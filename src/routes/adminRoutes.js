var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var Books = [{
    title: 'Peace & War',
    genre: 'Fiction',
    author: 'Mehd Iaz',
    read: false
}, {
    title: 'Coconuts',
    genre: 'Culinary',
    author: 'Mehd Iaz',
    read: false
}, {
    title: 'Sentient Visitors',
    genre: 'Science-Fiction',
    author: 'Mehd Iaz',
    read: false
}, {
    title: 'Disturbing Eyes',
    genre: 'Horror',
    author: 'Mehd Iaz',
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