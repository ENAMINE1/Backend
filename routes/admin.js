const express = require('express');
const Request = require('../models/request');
const router = express.Router();

router.get('/request', function (req, res, next) {
    Request.find({}).then(function (requests) {
        res.send(requests);
    });
 });


module.exports = router;