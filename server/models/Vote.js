const mongoose = require('mongoose')

//store the posts and comments a user has liked
var voteSchema = new mongoose.Schema({
    user: mongoose.Types.ObjectId,
    posts: [mongoose.Types.ObjectId],
    comments: [mongoose.Types.ObjectId],
})

module.exports = mongoose.model("votes", voteSchema)