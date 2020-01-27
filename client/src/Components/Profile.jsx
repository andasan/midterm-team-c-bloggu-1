import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { api } from "../api";

import Header from "./Header";
import Navigation from "./Navigation";
import UserArticles from "./UserArticles";

const Profile = ({ match, history }) => {
    const [articlesData, setArticlesData] = useState([]);
    const [userData, setUserData] = useState([]);

    let user;
    if (localStorage.getItem("user")) {
        user = JSON.parse(localStorage.getItem("user"));
    }

    useEffect(() => {
        async function fetchArticles() {
            const articles = await api.get("/postByUser/" + match.params.userid);
            setArticlesData(articles.data.articles);
        }
        fetchArticles();

        async function fetchUser() {
            const user = await api.get("/user/" + match.params.userid);
            setUserData(user.data.user);
        }
        fetchUser();
    }, []);

    const deleteAll = async event => {
        event.preventDefault();
        const deleteArticle = await api.delete("/deleteAll/"+user._id )
            .then(function (response) {
                // history.push("/u/"+user._id); //unable to refresh the same page
                history.push("/");
            })
            .catch(function (error) {
                console.log(error);            
            });
    };

    const profileHeaderStyle = {
        height: '50vh',
        backgroundImage: `url("${userData.displayPicture}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        verticalAlign: 'top',
        backgroundPosition: 'center center',
        transformOrigin: 'center top',
        transform: 'translateZ(-#{0.5 * 2}px) scale(1 + 0.5 * 2)'
    }

    return (
        <div className="profile_main">
            <div className="profile_header" style={profileHeaderStyle}>
            </div>
            <div className="profile_section">
                <Header />
                <div className="profile_main_wrapper">

                    <div className="profile_article_wrapper">
                        <Navigation />

                        <div className="create_article_section">
                            <div><h3>{userData.firstName}'s Posts</h3></div>
                            {user._id !== userData._id ? (
                                <div>
                                </div>
                            ) : (
                                <div>
                                    <i className="fa fa-plus-circle"></i>
                                    <a href="/post">Create New Post</a>
                                    &nbsp;&nbsp;/&nbsp;&nbsp;
                                    <i className="fa fa-trash-alt"></i>
                                    <a onClick={deleteAll}>Delete All Post</a>
                                </div>
                            )}
                        </div>

                        <div className="profile_articles">
                            <UserArticles data={articlesData} />
                        </div>

                    </div>
                </div>
                <br /><br /><br /><br /><br /><br />
                <footer>&copy; Copyright 2020. Team C</footer>
            </div>
        </div>
    );
}

export default Profile;