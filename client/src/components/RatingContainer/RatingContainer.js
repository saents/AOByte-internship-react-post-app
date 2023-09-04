import React, { useState } from "react";
import "./RatingContainer.css";
import PostsBoard from "./PostsBoard/PostsBoard";
import { useSelector } from "react-redux";


const RatingContainer = (props) => {
    const posts = useSelector((state) => state.posts.posts) || [];
    const [usedPostsIds, setUsedPostsIds] = useState([]);

    const addIdToUsedPostsIds = (postId) => {
        setUsedPostsIds((prevState) => [...prevState, postId]);
    };

    const deleteIdFromUsedPostsIds = (postId) => {
        const updatedUsedPostsIds = usedPostsIds.filter((postIdFromUsedPost) => postIdFromUsedPost !== postId);
        setUsedPostsIds(updatedUsedPostsIds);
    };

    return (
        <div className="rating_container">
            <div className="rating_board">
                <PostsBoard
                    usedPostsIds={usedPostsIds}
                    postsData={posts}
                    addToUsedPosts={addIdToUsedPostsIds}
                    deleteFromUsedPosts={deleteIdFromUsedPostsIds}
                />
                <PostsBoard
                    usedPostsIds={usedPostsIds}
                    postsData={posts}
                    addToUsedPosts={addIdToUsedPostsIds}
                    deleteFromUsedPosts={deleteIdFromUsedPostsIds}
                />
            </div>
        </div>
    );
};

export default RatingContainer;
