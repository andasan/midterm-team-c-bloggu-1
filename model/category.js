const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    featuredImage: {
      type: String
    }
  },
  { timestamps: true }
);

const Category = mongoose.model("Categories", categorySchema);
module.exports = Category;
