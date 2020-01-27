const Category = require("../model/category");
// const mongoose = require("../db/db");

exports.getAllPosts = async (req, res) => {
  console.log("REQ = ", req.params);
  try {
    const category = await Category.find( { title: req.params.category } );
    return res.status(201).send({ category });
  } catch (e) {
    console.log("ERROR = ",e);
    return res.status(400).send(e);
  }
};
