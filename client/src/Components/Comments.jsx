import React from "react";
import Moment from 'react-moment';

const Comments = (props) => {

    const findUserName = (id) => {
        let userName;
        props.users.map(entry => {
            if (entry._id === id) userName = entry.firstName + " " + entry.lastName;
        });
        return userName;
    };

    const findUserPic = (id) => {
        let displayPic;
        props.users.map(entry => {
            if(entry._id === id) {
                displayPic = entry.displayPicture;
            }
        });
        return displayPic;
    }

    return (
        props.comments.map(comment => (
            <div className="comments_list" key={comment._id}>
                <div className="comment_content">
                    <div className="coment_content_top">
                        
                        <a href={`/u/${comment.userId}`}><div className="author_picture" style={{ backgroundImage: `url("${findUserPic(comment.userId)}")`, height: '40px' }}></div></a>
                        <div><a href={`/u/${comment.userId}`}>{findUserName(comment.userId)}</a> <br /> <Moment date={comment.createdAt} format="YYYY/MM/DD" /></div>
                    </div>
                    <p>{comment.content}</p>
                </div>
            </div>
        ))
    )
};

export default Comments;



