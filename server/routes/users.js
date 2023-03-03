var express = require('express');
var User = require("../models/User")
const { body, validationResult } = require('express-validator')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
var router = express.Router();


router.post('/register', body('username').isEmail(), body('password').isLength({ min: 3 }), function (req, res, next) { //validate email and password fulfill requirements
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  //create new user if one by the same name doesnt already exist
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
  //find the user in question and assign them a token they can then use auth routes with
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.json({ msg: "User not found" })
      }
      else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            const jwtPayload = {
              id: user._id,
              username: user.username
            }
            jwt.sign(
              jwtPayload,
              process.env.SECRET,
              {
                expiresIn: 120
              },
              (err, token) => {
                res.json({
                  msg: "Login successful",
                  token: token
                })
              }
            )
          }
        })
      }
    })
})

module.exports = router;
