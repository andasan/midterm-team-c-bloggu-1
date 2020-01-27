const express = require("express");
const app = express();
const cors = require("cors");
require("./db/db");
const userRouter = require("./router/user");
const postRouter = require("./router/post");
const categoryRouter = require("./router/category");

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(postRouter);
app.use(categoryRouter);

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`listening port ${port}`);
});
