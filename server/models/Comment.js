// const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

//store the comments, relation to the user that made them and a relation to the post and the amount of votes they have
var commentSchema = new mongoose.Schema({
    post: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId,
    username: String,
    text: String,
    votes: Number
})

module.exports = mongoose.model("comments", commentSchema)