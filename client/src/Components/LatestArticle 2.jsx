import React from "react";
import Moment from 'react-moment';

const countBodyNum = body => {
    if (body.length >= 110) {
        return body.slice(0, 300) + "...";
    }
    return body;
};
const LatestArticle = (props) => {
    return (
        props.data.map(entry => (
            <div className="latest_article" key={entry.title}>
                <div className="child"><a href={`/article/${entry._id}`}><div className="latest_article_image" style={{ backgroundImage: `url("${entry.featuredImage}")`, height: '280px' }}></div></a></div>
                <div className="latest_article_content">
                    <div className="latest_article_content_top">
                        <a href={`/u/${entry.author}`}><div className="author_picture"><img src="" /></div></a>
                        <div><a href={`/u/${entry.author}`}>{entry.author}</a> <br /> <Moment date={entry.createdAt} format="YYYY/MM/DD" /></div>
                    </div>
                    <h3><a href={`/article/${entry._id}`}>{entry.title}</a></h3>
                    <p>{countBodyNum(entry.content)}</p>
                </div>
            </div>
        ))
    )
}

export default LatestArticle;