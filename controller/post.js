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
    const article = await Post.findOne({ _id: req.params.articleId })
      .populate('articleId')
    return res.status(201).send({ article });
    
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const articles = await Post.find( { userId: req.params.userId } );
    return res.status(201).send({ articles });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getPostsByCategory = async (req, res) => {
  try {
    const articles = await Post.find( { category: req.params.category } );
    return res.status(201).send({ articles });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.editPost = async (req, res) => {
  try {
    const article = await Post.findByIdAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          userId: req.body.userId,
          featuredImage: req.body.featuredImage,
          category: req.body.category
        }
      }
    );
    return res.status(201).send({ article });
  } catch (e) {
    console.log("ERROR = ",e);
    return res.status(400).send(e);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const article = await Post.findByIdAndDelete({ _id: req.params.id });

    return res.status(201).send({ article });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.deleteAllPosts = async (req, res) => {
  try {
    const article = await Post.deleteMany({ userId: req.params.id });

    return res.status(201).send({ article });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.post = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    featuredImage: req.body.featuredImage,
    category: req.body.category
  });
  try {
    if (!post) {
      return res.send("fail to post");
    }
    await post.save();
    return res.status(201).send({ post });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.postLike = async (req, res) => {
  try {
    const article = await Post.findByIdAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          likes: req.body.likes
        }
      }
    );
    return res.status(201).send({ article });
  } catch (e) {
    console.log("ERROR = ",e);
    return res.status(400).send(e);
  }
};

exports.getHomePage = (req, res, next) => {
  res.render("home");
};

exports.displayArticle = async (req, res) => {
  const post = new Post({
    title: "Test",
    content: "test test test",
    userId: "123",
    featuredImage: "abc.img",
    category: "technology"
  });
  try {
    if (!post) {
      return res.send("fail to post");
    }
    await post.save();
    return res.status(201).send({ post });
  } catch (e) {
    return res.status(400).send(e);
  }
};