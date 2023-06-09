var express = require('express');
const { model } = require('mongoose');
const Book = require('../models/book');
const User = require('../models/user')
const Purchase = require('../models/purchase');
const Request = require('../models/request');
var nodemailer = require('nodemailer');
var Temp = require('../models/temp');
const mongoose = require('mongoose');
var router = express.Router();


// this functionality return you the list of books for the search and if nothing is typed in the search then randomly books are displayed
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
/* GET users listing. */
// Loading the webpage after login
router.get('/', function (req, res, next) {
  var book_name = makeid(1);
  console.log(req.params.userid);
  Book.find({ $or: [{ name: { $regex: book_name, $options: 'i' } }, { author: { $regex: book_name, $options: 'i' } }] }).limit(50).then(function (books, next) {
    res.send(books);
    console.log(books);
  }).catch(next);

});

// Handeling search request on the page
router.get('/search', function (req, res, next) {
  var book_name = '';
  book_name = req.query.name;
  if (book_name.length == 0) {
    book_name = makeid(1);
  }
  console.log(book_name);
  Book.find({ $or: [{ name: { $regex: book_name, $options: 'i' } }, { author: { $regex: book_name, $options: 'i' } }] }).limit(50).then(function (books) {
    res.send(books);
    // console.log(books);
  }
  ).catch(next);
});

// If the user clicks on any book then the datils of the book are displayed

router.get('/search/:id', function (req, res, next) {
  console.log(req.params);
  Book.findById({ _id: req.params.id }).then(function (book) {
    res.send(book);
  }).catch(next);
});

//when the user clicks on purchase button then the request is sent to the server and the request is stored in the database
router.post('/:userid/search/:id/purchase', function (req, res, next) {
  console.log(req.params);
  Book.findById({_id:req.params.id}).then((book)=>{
    User.findById({_id:req.params.userid}).then((user)=>{
      var temp={
        'user_id':new mongoose.Types.ObjectId(req.params.userid),
        'book_id':new mongoose.Types.ObjectId(req.params.id),
        'username':user.username,
        'name':book.name,
        'author':book.author
      };
      Temp.create(temp).then((temp)=>{
        res.send(temp);
      }).catch(next);
    });
  });
});

// creating a request for a new book
router.post('/books/request', function (req, res, next) {
  // console.log(req.params.id);
  console.log(req.body)
  Book.find({ name: req.body.name, author: req.body.author }).then(function (book) {
    if (book.length != 0) {
      res.send({ type: 'Book already exists', exist: 'true' });
    } else {
      Request.create(req.body).then(function (request) {
        res.send(request);
        console.log(request);

      }).catch(next);
    }
  });
});

module.exports = router;
