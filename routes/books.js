const bodyParser = require('body-parser');
var express = require('express');
const Book = require('../models/book');
const Kmp = require('../Helper/KMP');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  // res.send('respond with a resource');
  console.log(req.body.name);
  var book_name = req.body.name;
  var book_author = req.body.author;
  //Book.find({ $or: [{ name: { $regex: book_name, $options: 'i' } }, { author: { $regex: book_author, $options: 'i' } }] })
  //find all the books which have the same name//$regex: '.*' + book_name + '.*'
  Book.find({ $or: [{ name: { $regex: book_name, $options: 'i' } }, { author: { $regex: book_name, $options: 'i' } }] }).limit(50).then(function (books) {
    res.send(books);
    console.log(books);
  }
  ).catch(next);
});

router.post('/', function (req, res, next) {
  // var book = new Book(req.body);
  // book.save(function (err, book) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.json(book);
  // });
  Book.create(req.body).then(function (book) {
    res.send(book);
    console.log(book);
  }).catch(next);
});

router.delete('/:id', function (req, res, next) {
  // console.log(req.params.id);
  Book.findByIdAndRemove({ _id: req.params.id }).then(function (book) {
    res.send(book);
    console.log(book);
  });
  res.send({ type: 'DELETE' });
});
module.exports = router;
