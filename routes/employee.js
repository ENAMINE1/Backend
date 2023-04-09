const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const User = require('../models/user');
const mongoose = require('mongoose');
// const Request = require('../models/request');
const Purchase = require('../models/purchase');
const Request = require('../models/request');
const Temp = require('../models/temp');
var nodemailer = require('nodemailer')
require('dotenv').config()

// this functionality retuhttps://docs.google.com/presentation/d/1KiSIVsid3F1CQHYSTBwPNaZlpahyN4fv3ikHjlF10Pc/edit?usp=sharingrn you the list of books the users have purchased
router.get('/', function (req, res, next) {

});


router.get('/purchase', function (req, res, next) {
  Temp.find({}).then(function (temp) {
    res.send(temp);
  });
});

router.get('/purchase/search', function (req, res, next) {
  var name = req.query.value;
  Temp.find({ $or: [{ name: { $regex: name, $options: 'i' } }, { author: { $regex: name, $options: 'i' } }, { username: { $regex: name, $options: 'i' } }] }).then(function (temp) {
    res.send(temp);
  });
});

// this functionality creates a recipt of the purchase
// router.get('/purchase/:id', function (req, res, next) {
//   Temp.find({ _id: req.params.id }).then(function (temp) {
//     res.send(temp);
//   });
// });
// when the user clicks on purchase button then the request is sent to the server and the request is stored in the database
router.post('/purchase/:id/recipt', function (req, res, next) {
  Temp.findByIdAndRemove({ _id: req.params.id }).then((temp) => {
   if(!temp){
     res.send("No data found")
   }
   else {
    console.log(temp);
    console.log(temp.user_id);
    User.findById({ _id: temp.user_id }).then((user) => {
      var d_user = user.toObject();
      delete d_user._id;
      delete d_user.__v;
      Book.findById({ _id: temp.book_id }).then((book) => {
        var d_book = book.toObject();
        delete d_book._id;
        delete d_book.__v;
        var purchase = { ...d_book, ...d_user };
        purchase.user_id = temp.user_id;
        purchase.book_id = temp.book_id;
        book.owned = book.owned - 1;
        Purchase.create(purchase).then((purchase) => {
          user.purchases.push(purchase._id);
          user.save();
          book.save();
          res.send(purchase);


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
            text: 'We thank you for purchasing the book \"' + book.name + '\" by \"' + book.author + '\".\nThe price of the book is $' + book.price + '!' + '\n We hope you enjoy reading the book!\n\n Sincerely,\n Bookstore Team. \n Shashwat Kumar \n Sukanth E. \n Tanisq Choudhary \n',
            attachments: [
              {
                filename: 'notes.txt',
                content: 'We thank you for purchasing the book \"' + book.name + '\" by \"' + book.author + '\".\nThe price of the book is $' + book.price + '!' + '\n We hope you enjoy reading the book!\n\n Sincerely,\n Bookstore Team. \n Shashwat Kumar \n Sukanth E. \n Tanisq Choudhary \n',
                contentType: 'text/plain' // optional, would be detected from the filename
              },
              {
                filename: 'image.png',
                path: book.image,
                cid: 'unique@kreata.ee' //same cid value as in the html img src
              }],
              html: '<img src="cid:unique@kreata.ee"/>',


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
    }
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
