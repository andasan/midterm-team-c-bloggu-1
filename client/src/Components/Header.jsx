import React from "react";
import "./Header.scss";
import bloggu_logo from "../images/bloggu_logo.png";
import { Link, withRouter } from "react-router-dom";

const Header = props => {
  let history = props.history;
  const handleClick = () => {
    localStorage.removeItem("user");
    history.push("/");
  };

  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  return (
    <nav>
      <div className="wrapper">
        <a href="/">
          <img className="logo" src={bloggu_logo} alt="logo" />
        </a>
        <div>
          {user === undefined ? (
            <div>
              <Link to="/signin">Login</Link> /
              <Link to="/signup">Register</Link>
            </div>
          ) : (
            <div>
              <Link className="header_link" to={`/u/${user._id}`}>
                {user.userName}
              </Link>{" "}
              / <a onClick={handleClick}>Signout</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
