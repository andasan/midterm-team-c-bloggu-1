const express = require("express");
const router = express.Router();

const { 
    getAllPosts, 
    getPost, 
    getPostsByUser, 
    getPostsByCategory, 
    editPost, 
    deletePost, 
    deleteAllPosts, 
    post, 
    postLike 
} = require("../controller/post");


router.get("/articles", getAllPosts);

router.get("/:articleId", getPost);

router.get("/postByUser/:userId", getPostsByUser);

router.get("/postByCategory/:category", getPostsByCategory);

router.post("/update", editPost);

router.delete("/delete/:id", deletePost);
router.delete("/deleteAll/:id", deleteAllPosts);

router.post("/post", post);
router.post("/like", postLike);

module.exports = router;
