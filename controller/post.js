const Post = require("../model/post");
// const mongoose = require("../db/db");

exports.getAllPosts = async (req, res) => {
  try {
    const articles = await Post.find();
    return res.status(201).send({ articles });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getPost = async (req, res) => {
  try {
    const article = await Post.findById({ _id: req.params.articleId });
    return res.status(201).send({ article });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.editPost = async (req, res) => {
  try {
    const article = await Post.findByIdAndUpdate(
      { _id: req.params.articleId },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          userId: "123",
          featuredImage: req.body.image,
          category: req.body.category
        }
      }
    );
    return res.status(201).send({ article });
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const article = await Post.findByIdAndDelete({ _id: req.parms.articleId });

    return res.status(201).send({ article });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.post = async (req, res) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId
    // featuredImage: req.body.image,
    // category: req.body.category
  });

  console.log(post);
  try {
    if (!post) {
      return res.send("fail to post");
    }
    await post.save();
    return res.status(201).send({ post });
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};
