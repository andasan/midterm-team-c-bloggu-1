import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import HomePage from "./Components/HomePage";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Article from "./Components/Article";
import Post from "./Components/Post";
import Edit from "./Components/Edit";
import Profile from "./Components/Profile";
import Category from "./Components/Category";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Base = () => {
  return (
    <Router>
      <Route path="/post" exact component={Post} />
      <Route path="/edit/:id" exact component={Edit} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/article/:id" exact component={Article} />
      <Route path="/category/:category" exact component={Category} />
      <Route path="/u/:userid" exact component={Profile} />
      <Route path="/" exact component={HomePage} />
    </Router>
  );
};

ReactDOM.render(<Base />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
