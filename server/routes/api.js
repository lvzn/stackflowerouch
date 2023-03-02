var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const validateToken = require('../auth/validateToken')
const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require('../models/Comment');
const Vote = require('../models/Vote');

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

router.post('/vote', validateToken, (req, res, next) => {
    Vote.findOne({ user: req.user.id }).then(vote => {
        if (!vote) {
            let posts = []
            let comments = []
            req.body.post ? posts.push(req.body.post) : null
            req.body.comment ? comments.push(req.body.comment) : null
            Vote.create({
                user: req.user.id,
                posts: posts,
                comments: comments
            })
        }
        else {
            let posts = vote.posts
            let comments = vote.comments
            req.body.post ? posts.push(req.body.post) : null
            req.body.comment ? comments.push(req.body.comment) : null
            vote.posts = posts
            vote.comments = comments
            vote.save()
        }
    })
    req.body.post ? Post.findOne({ _id: req.body.post }).then(post => {
        post.votes++
        post.save()
    }) : null
    req.body.comment ? Comment.findOne({ _id: req.body.comment }).then(comment => {
        comment.votes++
        comment.save()
    }) : null
    res.json("Vote saved successfully")
})

router.post('/unvote', validateToken, (req, res, next) => {
    Vote.findOne({ user: req.user.id }).then(vote => {
        let posts = vote.posts
        let comments = vote.comments
        req.body.post ? posts.splice(posts.indexOf(req.body.post)) : null
        req.body.comment ? comments.splice(posts.indexOf(req.body.comment)) : null
        vote.posts = posts
        vote.comments = comments
        vote.save()
    })
    req.body.post ?
        Post.findOne({ _id: req.body.post }).then(post => {
            post.votes--
            post.save()
        }) : null
    req.body.comment ?
        Comment.findOne({ _id: req.body.comment }).then(comment => {
            comment.votes--
            comment.save()
        }) : null
    res.json("Vote saved successfully")
})

router.get('/vote', validateToken, (req, res, next) => {
    Vote.findOne({ user: req.user.id }).then(votes => {
        return res.json(votes)
    })
})


module.exports = router;
