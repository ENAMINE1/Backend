const bodyParser = require('body-parser');
var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    // console.log(req);
    // i want to acces the username in the body of the request
    // console.log(req.body.username);
    var name = req.query.username;
    User.find({name}).then(function (users) {
        res.send(users);
        // console.log(users);
    }, function (err) {
        console.log(err);
    });
});

router.post('/', function (req, res, next) {
    User.create(req.body).then(function (user) {
        res.send(user);
        console.log(user);
    }).catch(next);
});

module.exports = router;