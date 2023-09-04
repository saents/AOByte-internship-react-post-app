import React, { useEffect } from "react";
import PostsBoard from "../../components/PostsBoard/PostsBoard";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../store/reducers/postsReducer";


function PostsPage() {
    const {page, limit, sort, filter} = useSelector((state) => state.posts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll(page, limit))
    }, [page, limit, sort, filter, dispatch]);

    return (
        <>
            <PostsBoard />

            {/* TEST COMPONENT */}
            {/* <RatingContainer postsData={posts}/>*/}
        </>
    );
}

export default PostsPage;
