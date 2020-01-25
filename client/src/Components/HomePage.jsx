import React, { useState, useEffect } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import { api } from "../api";
import "./HomePage.scss";

import FeatureArticle from "./FeatureArticle";
import LatestArticle from "./LatestArticle";

const HomePage = () => {
  const [articleData, setArticleData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  useEffect(async () => {
    const articles = await api.get("/");
    // console.log("articles: ", articles);
    setArticleData(articles.data.articles);

    const users = await api.get("/users");
    // console.log("users: ", users.data.users);
    setUsersData(users.data.users);
  }, []);

  // console.log(articleData.data);
  return (
    <div className="home_main">
      <div className="home_header"></div>
      <div className="home_section">
        <Header />
        <div className="home_main_wrapper">
          <div className="home_article_wrapper">
            <Navigation />
            <div className="featured_articles">
              <FeatureArticle data={articleData} user={usersData} />
              {/* {featured_articles} */}
            </div>
            <div className="latest_articles">
              <LatestArticle data={articleData} user={usersData} />
            </div>
          </div>
        </div>
        <br/><br/><br/><br/><br/><br/>
        <footer>&copy; Copyright 2020. Team C</footer>
      </div>
    </div>
  );
};

export default HomePage;
