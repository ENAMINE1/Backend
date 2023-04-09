const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const User = require('../models/user');
// const Request = require('../models/request');
const Purchase = require('../models/purchase');
const Request = require('../models/request');
var nodemailer = require('nodemailer')
require('dotenv').config()

// this functionality retuhttps://docs.google.com/presentation/d/1KiSIVsid3F1CQHYSTBwPNaZlpahyN4fv3ikHjlF10Pc/edit?usp=sharingrn you the list of books the users have purchased
router.get('/', function (req, res, next) {

});


router.get('/purchase', function (req, res, next) {
  Purchase.find({}).then(function (purchases) {
    res.send(purchases);
  });
});

router.get('/purchase/search', function (req, res, next) {
  var name = req.query.value;
  Purchase.find({ $or: [{ name: { $regex: name, $options: 'i' } }, { author: { $regex: name, $options: 'i' } }, { username: { $regex: name, $options: 'i' } }] }).then(function (purchases) {
    res.send(purchases);
  });
});

// this functionality creates a recipt of the purchase
router.get('/purchase/:id', function (req, res, next) {
  console.log(req.params);
  Purchase.find({ _id: req.params.id }).then(function (purchases) {
    res.send(purchases);
  }), function (req, res, next) {
    console.log(req);
  }
});
// when the user clicks on purchase button then the request is sent to the server and the request is stored in the database
router.put('/purchase/:id/recipt', function (req, res, next) {
  console.log(req.params);
  Purchase.findById({ _id: req.params.id }).then(function (purchase) {
    Book.findById({ _id: purchase.book_id }).then(function (book) {
      //update the copies attribute of the book
      // book.send();
      book.owned = book.owned - 1;
      book.save();
      console.log(book);
      //update the purchase attribute of the user
      User.findById({ _id: purchase.user_id }).then(function (user) {
        user.favauthors.push(book.author);
        user.favbooks.push(book.name);
        user.favpublishers.push(book.publisher);
        user.save();
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
          from: "kshashwat@gmail.com",
          to: user.email,
          subject: 'Thankyou for Purchasing the Book!',
          text: 'We thank you for purchasing the book \"' + book.name + '\" by \"' + book.author + '\".\nThe price of the book is $' + book.price + '!' + '\n We hope you enjoy reading the book!\n\n Sincerely,\n Bookstore Team. \n Shashwat Kumar \n Sukanth E. \n Tanisq Choudhary \n'
        };
        transporter.sendMail(mailOptions, function (err, data) {
          if (err) {
            console.log("Error " + err);
          } else {
            console.log("Email sent successfully");
          }
        });
      });
    });
  });
});


router.delete('/:id', function (req, res, next) {
  // console.log(req.params.id);
  Book.findByIdAndRemove({ _id: req.params.id }).then(function (book) {
    res.send(book);
    console.log(book);
  });
  res.send({ type: 'DELETE' });
});

// this functionality creates a recipt of the purchase

module.exports = router;
