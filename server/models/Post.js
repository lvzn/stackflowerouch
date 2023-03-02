const mongoose = require('mongoose');

//store the posts and a relation to the user that made them
var postSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    username: String,
    text: String,
    votes: Number,
    comments: [mongoose.Types.ObjectId]
});

//Export the model
module.exports = mongoose.model('posts', postSchema);