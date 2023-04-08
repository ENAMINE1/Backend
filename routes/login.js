const bodyParser = require('body-parser');
var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var name = req.body.username;
    var type = req.body.usertype;
    var password = req.body.userpassword;
    if (type == 'admin') {
        Admin.find({ name: name, password: password }).then(function (admins) {
            res.send(admins);
        }, function (err) {
            console.log(err);
        }).catch(next);
    } else if (type == 'employee') {
        Employee.find({ name: name, password: password }).then(function (employees) {
            res.send(employees);
        }, function (err) {
            console.log(err);
        }).catch(next);
    }
    else {
        User.find({ username: name, password: password }).then(function (users) {
            res.send(users);
        }, function (err) {
            console.log(err);
        }).catch(next);
    }
});
// creating a new user in the database
router.post('/signup', function (req, res, next) {
    User.create(req.body).then(function (user) {
        res.send(user);
        console.log(user);
    }).catch(next);
});

module.exports = router;