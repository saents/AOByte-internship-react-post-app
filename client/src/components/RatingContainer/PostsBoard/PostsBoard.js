import React, { useState } from "react";

import Post from "./Post/Post";
import Button from "../../UIKit/Button/Button";

import { filterUsedPosts, getPostIdWithAverageRating } from "../../../helpers";

import "./PostsBoard.css";

import { errorMassageIfPostsNoExist } from "../../../constants/errorMassages";
import { baseClassAnimation, fadeIdLeft, fadeOutRight } from "../../../constants/animationClasses";


const PostsBoard = ({usedPostsIds, postsData, addToUsedPosts, deleteFromUsedPosts}) => {
    const [posts, setPosts] = useState([]);
    const [isAscendingSort, seIsAscendingSort] = useState(true);
    const [isSortClicked, setIsSortClicked] = useState(false);

    const postAddButtonHandler = () => {
        const filteredUsedPosts = filterUsedPosts(postsData, usedPostsIds);
        const {maxAverageRating, postIdWithMaxRating} = getPostIdWithAverageRating(filteredUsedPosts);
        addToUsedPosts(postIdWithMaxRating);
        const postWithAverageRate = postsData.find((item) => item._id === postIdWithMaxRating);
        setPosts((prevState) => [...prevState, {...postWithAverageRate, averageRating: maxAverageRating}]);
        setIsSortClicked(false);
    };

    const deletePostButtonHandler = () => {
        try {
            const lastAddedPost = posts.length && posts.pop();

            if (!lastAddedPost) {
                throw new Error(errorMassageIfPostsNoExist);
            }

            const lastPostNode = document.querySelector(`.post-${lastAddedPost._id}`);
            lastPostNode.classList.add(fadeOutRight);

            deleteFromUsedPosts(lastAddedPost._id);
        } catch (e) {
            console.log(e);
        }
    };

    const sortAddedPosts = () => {
        if (!posts.length) {
            return;
        }

        const sortedPostsByRating = posts.sort((a, b) => {
            return isAscendingSort ? a.averageRating - b.averageRating : b.averageRating - a.averageRating;
        });

        setPosts(sortedPostsByRating);
        seIsAscendingSort(!isAscendingSort);
        setIsSortClicked(true);
    };

    const isAddPostButtonDisabled = () => {
        return postsData.length === usedPostsIds.length;
    };

    const isDeletePostButtonDisabled = () => {
        return !posts.length;
    };

    const isSortAddedPostsButtonDisabled = () => {
        return posts.length < 2;
    };

    return (
        <div className="post_board">
            <div className="post_column">
                {
                    posts.map((post) => (
                        <Post className={isSortClicked ? [] : [baseClassAnimation, fadeIdLeft]}
                              title={post.title}
                              id={post._id}
                              rating={post.averageRating.toFixed(2)}
                              key={post._id}
                        />
                    ))
                }
            </div>
            <div className="actions_column">
                <Button
                    disabled={isAddPostButtonDisabled()}
                    onClick={postAddButtonHandler}
                    className="post_board_btn"
                >
                    +
                </Button>
                <Button
                    disabled={isDeletePostButtonDisabled()}
                    onClick={deletePostButtonHandler}
                    className="post_board_btn"
                >
                    -
                </Button>
                <Button
                    disabled={isSortAddedPostsButtonDisabled()}
                    onClick={sortAddedPosts}
                    className="post_board_btn"
                >
                    Sort
                    {" "}
                    {isAscendingSort ? "↑" : "↓"}
                </Button>
            </div>
        </div>
    );
};

export default PostsBoard;
