const express = require('express');
const Request = require('../models/request');
const router = express.Router();
const Book = require('../models/book');
const Vendor = require('../models/vendor');

router.get('/request', function (req, res, next) {
    Request.find({}).limit(50).then(function (requests) {
        res.send(requests);
    });
});

router.get('/stat/search/:id', (req, res, next) => {
    // let book=req.query.name;
    console.log(req.params.id);
    Book.findById({ _id: req.params.id }).then((arr) => {
        console.log(arr);
        var books = arr;
        let obj = {
            'name': books.name,
            'image':books.image,
            'copies_sold': books.total,
            'sales_revenue': (books.total + books.sold) * (books.price),
            'past_sales': books.past,
            'publisher': books.publisher
        };
        res.send(obj);

    });
});

router.get('/stat/search', (req, res, next) => {
    let book = req.query.name;
    Book.find({ name: { $regex: book, $options: 'i' } }).limit(50).then((books) => {
        res.send(books);
    });
});
router.get('/threshold', (req, res, next) => {
    let array_res = [];
    Book.find({}).then((arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].owned < arr[i].threshold) {
                array_res.push(arr[i]);
            }
        }
        return array_res;
    }).then((array_res) => {
        res.send(array_res);
    });
});
router.get('/inventory', (req, res, next) => {
    let id = req.query.id;
    Book.find({ _id: id }).then((arr) => {
        let books = arr[0];
        let obj = {
            'name': books.name,
            'vendor': books.vendor,
            'sales_revenue': (books.total + books.sold) * (books.price),
            'past_sales': books.past,
            'publisher': books.publisher,
            'inventory': 0
        };
        return obj;
    }).then((obj) => {
        Vendor.find({ vendor: obj.vendor }).then((ven) => {
            for (let i = 0; i < ven[0].publishers.length; i++) {
                if (ven[0].publishers[i] == obj.publisher) {
                    obj.inventory = ven[0].days_taken[i] * (obj.past_sales[5] + obj.past_sales[4]);
                    break;
                }
            };
            return obj;
        }).then((obj) => {
            res.send(obj);
        });
    });
});
module.exports = router;