var express = require('express');
const Book = require('../models/book');
var router = express.Router();

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

/* GET home page. */
router.get('/', function (req, res, next) {
// send me a req query with username as parameter and the i will return random books and user details to show on the webpage

  var book_name = makeid(1);
  Book.find({ $or: [{ name: { $regex: book_name, $options: 'i' } }, { author: { $regex: book_name, $options: 'i' } }] }).limit(2).then(function (books) {
    res.send(books);
    console.log(books);
  }
  ).catch(next);
});

module.exports = router;
