import React, {useState} from "react";
import "./Article.scss";
import { api } from "../api";

import Header from "./Header";
import Navigation from "./Navigation";

const articleData = {
    featuredImage: "https://images.unsplash.com/photo-1509680859026-7d8cfc6894f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3900&q=80",
    title: "秋山成勲が6000円ラーメンに仰天し1500円のラーメン注文",
    content: `格闘家・秋山成勲（40）が、「高過ぎるラーメン」をブログで紹介した。その価格、6000円。秋山はさすがにそのラーメンは食べず、もう少しランクの低い1500円のものを食べたのだという。店は大阪の「神戸牛拉麺915」。神戸牛を扱う店である。

    「最高級のしゃぶしゃぶ肉使用。極上の一杯。贅の極み拉麺」と題されており、「神戸牛サーロイン拉麺」は4000円で、「神戸牛ヘレ拉麺」は6000円。
    
    秋山は、「さすがに高いから」と1500円の「神戸牛拉麺（中）」を頼んだ。
    
    「上から牛のスープを、かけしゃぶしゃぶしながら麺を食べる!?
    
    美味い!!　さすが神戸牛やね!?
    
    今度は6000円イッタろかなー!?」
    
    と次は最上級の6000円ラーメンへの挑戦を示唆した。
    
    ラーメン好き集まれ～」
    
    こう呼びかけた。このラーメンに対してはすでにネットにはレビューがあり、食べログで「とよつね」氏は「熱々スープで半レア状態になったA5ランクの神戸牛がたっぷりとのってあり、とろける柔らかさでとても美味しく頂けます」と評している。
    `,
    category: "Food",
    published_date: "Jan 23 2020",
    author: "Marie"
};

const articleHeaderStyle = {
    height: '50vh',
    background: `url("${articleData.featuredImage}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    verticalAlign: 'top',
    backgroundPosition: 'center center',
    transformOrigin: 'center top',
    transform: 'translateZ(-#{0.5 * 2}px) scale(1 + 0.5 * 2)'
}


const Article = (userID) => {
    const [response, setResponse] = useState();

  const responseForm = async event => {
      console.log("clicked");
    event.preventDefault();
    if (response !== undefined && response !== "") {
      const user = await api.post("/comment", {
        comment: response
      });
      localStorage.setItem("user", user.data.user._id);

      setResponse("");
    }
  };

  const handleResponseChange = value => {
    setResponse(value);
  };

    return (
        <>
            <div className="article_main">
                <header style={articleHeaderStyle}>
                </header>
                <div className="article_section">
                    <Header />
                    <div className="article_main_wrapper">

                        <div className="article_wrapper">
                            <Navigation />
                            <h1 className="article_title">{articleData.title}</h1>
                            <div className="author">
                                <div className="author_picture"><img src="" /></div>
                                <div className="author_name"><a href={`/u/${articleData.author}`}>{articleData.author}</a> - {articleData.published_date}</div>

                                <div className="article_cat">{articleData.category}</div>
                            </div>

                            <div className="article_content">
                                <p>{articleData.content}</p>
                            </div>

                            <div className="article_likes">
                            <h3><i className="far fa-heart"></i> -Like goes here-</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="article_response">
                <div className="wrapper">
                    Write a comment<br />
                    <form onSubmit={responseForm}>
                        <div className="group">
                            <input
                                type="hidden"
                            />
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

                    Comments<br />
                    <hr/>
                </div>

            </div>
        </>
    );
};

export default Article;