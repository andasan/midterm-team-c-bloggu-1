import React from "react";
import "./Header.scss";
import bloggu_logo from "../images/bloggu_logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  console.log(user);
  return (
    <nav>
      <div className="wrapper">
        <a href="/">
          <img className="logo" src={bloggu_logo} />
        </a>
        <div>
          {user === undefined ? (
            <div>
              <Link to="/signin">Login</Link> /{" "}
              <Link to="/signup">Register</Link>
            </div>
          ) : (
            <div>
              {user.userName} / <Link to="/post">Post</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
