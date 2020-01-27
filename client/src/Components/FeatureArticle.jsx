import React from "react";
import Moment from 'react-moment';
import { api } from "../api";

const FeatureArticle = (props) => {

    const findUserName = (id) => {
        let userName;
        props.user.map(entry => {
            if(entry._id === id) userName = entry.firstName +" "+entry.lastName;
        });
        return userName;
    };

    const findUserPic = (id) => {
        let displayPic;
        props.user.map(entry => {
            if(entry._id === id) {
                displayPic = entry.displayPicture;
            }
        });
        return displayPic;
    };

    return (
        props.data.slice(0, 4).map(entry => (
            <div className="featured_article" key={entry._id}>
                <div className="child"><a href={`/article/${entry._id}`}><div className="featured_image" style={{ backgroundImage: `url("${entry.featuredImage}")`, height: '247px' }}></div></a></div>
                <div className="featured_content">
                    <h3><a href={`/article/${entry._id}`}>{entry.title}</a></h3>
                    <div className="content_bottom">
                        <a href={`/u/${entry.userId}`}><div className="author_picture" style={{ backgroundImage: `url("${findUserPic(entry.userId)}")`, height: '40px' }}></div></a>
                        <div><a href={`/u/${entry.userId}`}>{findUserName(entry.userId)}</a> <br /> <Moment date={entry.createdAt} format="YYYY/MM/DD" /></div>
                    </div>
                </div>
            </div>
        ))
    )
}

export default FeatureArticle;