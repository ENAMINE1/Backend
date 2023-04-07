const bodyParser = require('body-parser');
var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    // console.log(req);
    // i want to acces the username in the body of the request
    // console.log(req.body.username);
    var id = req.query.id;
    User.find({ _id: id }).then(function (users) {
        res.send(users);
        // console.log(users);
    }, function (err) {
        console.log(err);
    });
});
// deleting a new user in database
router.delete('/:id', function (req, res, next) {
    User.findByIdAndRemove({ _id: req.params.id }).then(function (user) {
        res.send(user);
    }).catch(next);
    res.send({ type: 'DELETE' });
});
module.exports = router;