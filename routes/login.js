const bodyParser = require('body-parser');
var express = require('express');
const User = require('../models/user');
var router = express.Router();
var nodemailer = require('nodemailer')
require('dotenv').config()
// console.log(process.env)

/* GET users listing. */
router.post('/', function (req, res, next) {
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
        res.send();
        // console.log(user);
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENTID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
        });
        let mailOptions = {
            from: "kshashwat.iit@gmail.com",
            to: req.body.email,
            subject: 'Thanky for Signing Up!',
            text: 'Welcome to Book Store!\n We are glad to have you on board. \n Happy Reading! \n\n Regards, \n Book Store Team \n Shashwat Kumar \n Sukanth E. \n Tanisq Choudhary \n'
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Email sent successfully");
            }
        });
    }).catch(next);
});

module.exports = router;