var express = require('express');
var router = express.Router();

router.post('/user', function (req, res, next) {
    res.json({ username: req.body.username, password: req.body.password, email: req.body.email })
});

module.exports = router;
