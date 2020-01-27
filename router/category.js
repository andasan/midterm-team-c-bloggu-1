const express = require("express");
const router = express.Router();

const { getAllPosts } = require("../controller/category");

router.get("/category/:category", getAllPosts);

module.exports = router;