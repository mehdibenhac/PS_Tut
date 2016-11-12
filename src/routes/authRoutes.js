var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function (nav) {

    authRouter.route('/signup')
        .post(function (req, res) {
            console.log(req.body);
            req.login(req.body, function () {
                res.redirect('/auth/profile');
            });
        });
    authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;