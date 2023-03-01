const mongoose = require('mongoose');


var postSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    username: String,
    text: String,
    votes: Number,
    comments: [mongoose.Types.ObjectId]
});

//Export the model
module.exports = mongoose.model('posts', postSchema);