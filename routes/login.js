const bodyParser = require('body-parser');
var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var name = req.body.username;
    var type = req.body.usertype;
    var password = req.body.userpassword;
    User.find({ username: name, type: type, password: password }).then(function (users) {
        res.send(users);
    }, function (err) {
        console.log(err);
    }).catch(next);
});
// creating a new user in the database
router.post('/signup', function (req, res, next) {
    User.create(req.body).then(function (user) {
        res.send(user);
        console.log(user);
    }).catch(next);
});

module.exports = router;