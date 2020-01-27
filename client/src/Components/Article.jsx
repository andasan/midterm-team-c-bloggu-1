import React, { useState, useEffect } from "react";
import "./Article.scss";
import { api } from "../api";
import Moment from "react-moment";
import { Link, withRouter } from "react-router-dom";

import Header from "./Header";
import Navigation from "./Navigation";
import Comments from "./Comments";

const Article = ({ match, history }) => {
  const [response, setResponse] = useState();
  const [articleData, setArticleData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);

  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    async function fetchArticle() {
      const article = await api.get("/" + match.params.id);
      setArticleData(article.data.article);
    }
    fetchArticle();

    async function fetchUsers() {
      const users = await api.get("/users");
      setUsersData(users.data.users);
    }
    fetchUsers();

    async function fetchComments() {
      const comments = await api.get("/comments");
      setCommentsData(comments.data.comments);
    }
    fetchComments();
  }, []);

  const findUserName = id => {
    let userName;
    usersData.map(entry => {
      if (entry._id === id) userName = entry.firstName + " " + entry.lastName;
    });
    return userName;
  };

  const findUserPic = id => {
    let displayPic;
    usersData.map(entry => {
      if (entry._id === id) {
        displayPic = entry.displayPicture;
      }
    });
    return displayPic;
  };

  const responseForm = async event => {
    event.preventDefault();
    if (response !== undefined && response !== "") {
      const user = await api.post("/comment", {
        comment: response
      });

      setResponse("");
    }
  };

  const deleteArticle = async event => {
    event.preventDefault();
    const deleteArticle = await api
      .delete("/delete/" + match.params.id)
      .then(function(response) {
        history.push("/u/" + user._id);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const articleHeaderStyle = {
    height: "50vh",
    backgroundImage: `url("${articleData.featuredImage}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    verticalAlign: "top",
    backgroundPosition: "center center",
    transformOrigin: "center top",
    transform: "translateZ(-#{0.5 * 2}px) scale(1 + 0.5 * 2)"
  };

  const handleResponseChange = value => {
    setResponse(value);
  };

  return (
    <>
      <div className="article_main">
        <div className="article_header" style={articleHeaderStyle}></div>
        <div className="article_section">
          <Header />
          <div className="article_main_wrapper">
            <div className="article_wrapper">
              <Navigation />
              <h1 className="article_title">{articleData.title}</h1>
              <div className="author">
                <a href={`/u/${articleData.userId}`}>
                  <div
                    className="author_picture"
                    style={{
                      backgroundImage: `url("${findUserPic(
                        articleData.userId
                      )}")`,
                      height: "40px"
                    }}
                  ></div>
                </a>
                <div className="author_name">
                  <a href={`/u/${articleData.userId}`}>
                    {findUserName(articleData.userId)}
                  </a>{" "}
                  - <Moment date={articleData.createdAt} format="YYYY/MM/DD" />
                  {user === undefined || user._id !== articleData.userId ? (
                    <div></div>
                  ) : (
                    <div>
                      <i className="fa fa-edit"></i>
                      <a href={`/edit/${articleData._id}`}> Edit Post</a>
                      &nbsp;&nbsp;/&nbsp;&nbsp;
                      <i className="fa fa-trash-alt"></i>
                      <a onClick={deleteArticle}>Delete Post</a>
                    </div>
                  )}
                </div>

                <a href={`/category/${articleData.category}`}>
                  <div className="article_cat">{articleData.category}</div>
                </a>
              </div>

              <div className="article_content">
                <p>{articleData.content}</p>
              </div>

              {user === undefined ? (
                <div></div>
              ) : (
                <div className="article_likes">
                  <h3>
                    <i className="far fa-heart"></i> 0
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="article_response">
        {user === undefined ? (
          <div></div>
        ) : (
          <div className="wrapper">
            Write a comment
            <br />
            <form onSubmit={responseForm}>
              <div className="group">
                <input type="hidden" />
                <br />
                <input
                  type="text"
                  placeholder="Enter your Response"
                  onChange={e => handleResponseChange(e.target.value)}
                  required
                />
              </div>
              <input type="submit" className="btn" value="Submit" />
            </form>
            Comments
            <br />
            <hr />
            <Comments users={usersData} comments={commentsData} />
          </div>
        )}

        <footer>&copy; Copyright 2020. Team C</footer>
      </div>
    </>
  );
};
export default withRouter(Article);
