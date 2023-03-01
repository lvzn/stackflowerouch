var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const validateToken = require('../auth/validateToken')
const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require('../models/Comment')

router.get('/post', (req, res, next) => {
    Post.find({}).then(posts => {
        res.send(posts)
    })
})

router.get('/post/:id', (req, res, next) => {
    Post.findOne({ _id: req.params.id }).then(post => {
        if (!post) return res.status(404).send("No post found")
        else return res.json(post)
    })
})

router.get('/comments/:id', (req, res, next) => {
    Comment.find({ post: req.params.id }).then(comments => {
        if (!comments) return res.status(404).send("No comments for that post.")
        else return res.json(comments)
    })
})

router.post('/comment', validateToken, (req, res, next) => {
    Comment.create({
        post: req.body.post,
        user: req.user.id,
        username: req.user.username,
        text: req.body.text,
        votes: 0
    }).then(() => {
        return res.send("Comment posted successfully")
    })
})

router.post('/post', validateToken, (req, res, next) => {
    Post.create({
        user: req.user.id,
        username: req.user.username,
        text: req.body.text,
        votes: 0,
        comments: null
    }).then(() => {
        return res.send("Post created successfully")
    })
})




module.exports = router;
