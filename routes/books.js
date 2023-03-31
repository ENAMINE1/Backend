const bodyParser = require('body-parser');
var express = require('express');
const Book = require('../models/book');
const Kmp = require('../Helper/KMP');
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
router.get('/', function (req, res, next) {
  // res.send('respond with a resource');
  // console.log(req.query.name);
  var book_name = req.query.name;
  // var book_author = req.body.author;
  //Book.find({ $or: [{ name: { $regex: book_name, $options: 'i' } }, { author: { $regex: book_author, $options: 'i' } }] })
  //find all the books which have the same name//$regex: '.*' + book_name + '.*'
  if (book_name.length==0)
  {
    book_name = makeid(1);
  }
  console.log(book_name);

  Book.find({ $or: [{ name: { $regex: book_name, $options: 'i' } }, { author: { $regex: book_name, $options: 'i' } }] }).limit(100).then(function (books) {
    res.send(books);
    // console.log(books);
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
