import React, { useEffect, useState } from "react";
import "./Category.scss";
import { api } from "../api";

import Header from "./Header";
import Navigation from "./Navigation";
import CategoryArticles from "./CategoryArticles";

const Category = ({ match }) => {
    const [articlesData, setArticlesData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            const articles = await api.get("/postByCategory/" + match.params.category);
            // console.log("ARTS: ",articles.data.articles);
            setArticlesData(articles.data.articles);
        }
        fetchArticles();

        async function fetchCategories() {
            const category = await api.get("/category/" + match.params.category);
            setCategoryData(category.data.category[0]);
        }
        fetchCategories();

        async function fetchUsers() {
            const users = await api.get("/users");
            setUsersData(users.data.users);
        }
        fetchUsers();
    }, []);

    const categoryHeaderStyle = {
        height: '50vh',
        backgroundImage: `url("${categoryData.image}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        verticalAlign: 'top',
        backgroundPosition: 'center center',
        transformOrigin: 'center top',
        transform: 'translateZ(-#{0.5 * 2}px) scale(1 + 0.5 * 2)'
    }

    return (
        <div className="category_main">
            <div className="category_header" style={categoryHeaderStyle}>
            </div>
            <div className="category_section">
                <Header />
                <div className="category_main_wrapper">

                    <div className="category_article_wrapper">
                        <Navigation />
                        <h1>{categoryData.title}</h1>
                        <CategoryArticles data={articlesData} user={usersData} />

                    </div>
                </div>
                <br /><br /><br /><br /><br /><br />
                <footer>&copy; Copyright 2020. Team C</footer>
            </div>
        </div>
    );
}

export default Category;