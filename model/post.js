const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
      // unique: true
    },
    featuredImage: {
      type: String
    },
    category: {
      type: String
      // required: true
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
