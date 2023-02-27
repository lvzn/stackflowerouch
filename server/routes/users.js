var express = require('express');
var User = require("../models/User")
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
var router = express.Router();


/* GET users listing. */
router.post('/register', body('username').isEmail(), body('password').isLength({ min: 3 }), function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  User.findOne({
    username: req.body.username,
  }).then((user) => {
    if (!user) {
      User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
      }).then(() => {
        return res.json({ msg: "User created" })
      })
    } else {
      res.status(403).json({ msg: "User already exists" })
    }
  });
});

router.post('/login', function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.json({ msg: "User not found" })
      }
      else {
        bcrypt.compareSync(req.body.password, user.password) ? res.json({ msg: "logged in" }) : res.json({ msg: "Wrong password" })
      }
    })
})

module.exports = router;
