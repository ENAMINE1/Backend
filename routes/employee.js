const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const User = require('../models/user');
// const Request = require('../models/request');
const Purchase = require('../models/purchase');

// this functionality creates a recipt of the purchase

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
