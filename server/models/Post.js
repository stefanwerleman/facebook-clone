const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Post Schema
const PostSchema = new Schema(
{
   handle: String,
   message: String,
   date: String
});

// Post Model
const Post = mongoose.model("post", PostSchema);

module.exports = Post;
