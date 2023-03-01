// const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
    post: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId,
    username: String,
    text: String,
    votes: Number
})

module.exports = mongoose.model("comments", commentSchema)