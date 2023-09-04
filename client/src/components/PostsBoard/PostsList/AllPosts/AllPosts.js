import React from 'react';
import Post from "../Post/Post";
import { useSelector } from "react-redux";

const AllPosts = () => {
    const {posts} = useSelector(state => state.posts);

    return (
        <>
            {posts.map((post) => <Post post={post} key={post._id}/>)}
        </>
    )

};

export default AllPosts;