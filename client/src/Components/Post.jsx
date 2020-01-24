import React, { useState } from "react";
import "./Post.scss";
import { api } from "../api";
import { Redirect } from "react-router-dom";
import Header from "./Header";

const postHeaderStyle = {
  height: "50vh",
  background: `url("https://images.unsplash.com/photo-1573718893672-86144926f4fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3900&q=80")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
  verticalAlign: "top",
  backgroundPosition: "center center",
  transformOrigin: "center top",
  transform: "translateZ(-#{0.5 * 2}px) scale(1 + 0.5 * 2)"
};

const Post = () => {
  const [postTitle, setTitle] = useState();
  const [postContent, setContent] = useState();

  const signinForm = async event => {
    console.log("inside signForm");
    event.preventDefault();
    if (postTitle !== undefined && postTitle !== "") {
      //handleSubmit(userEmail,userPass);
      try {
        const post = await api.post("/post", {
          title: postTitle,
          content: postContent,
          userId: localStorage.getItem("user")
        });
        return <Redirect to={"/"} />;
      } catch (err) {
        console.log(err);
      }

      setTitle("");
      setContent("");
    }
  };

  const handleTitleChange = value => {
    setTitle(value);
  };

  const handleContentChange = value => {
    setContent(value);
  };

  return (
    <div className="post_main">
      <div style={postHeaderStyle}></div>
      <div className="post_section">
        <Header />
        <div className="post_main_wrapper">
          <div className="post_article_wrapper">
            <h1>Write an Article</h1>
            <form onSubmit={signinForm}>
              <div className="group">
                <input
                  type="text"
                  placeholder="Title"
                  value={postTitle}
                  onChange={e => handleTitleChange(e.target.value)}
                />
                <br />
                <textarea
                  type="text"
                  placeholder="Write your content here"
                  value={postContent}
                  onChange={e => handleContentChange(e.target.value)}
                ></textarea>
              </div>
              <br />
              <input type="submit" className="btn" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
