import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Empty, Pagination, Select } from "antd";
import Loader from "../../Loader/Loader";
import AllPosts from "./AllPosts/AllPosts";

import { PaginationSelectOptions } from "../../../constants/SelectOptions";
import { setLimit, setPage } from "../../../store/reducers/postsReducer";

import styles from "./PostsList.module.scss";

const PostsList = () => {
    const {posts, isLoading, page, limit, totalPosts} = useSelector(state => state.posts);
    const dispatch = useDispatch();

    const handlePageChange = (page) => {
        dispatch(setPage(page));
    };

    const selectedPageSizeHandler = (value) => {
        dispatch(setPage(1));
        dispatch(setLimit(value));
    };

    return (
        <div className={styles.posts_list}>
            {
                !posts.length ?
                    (
                        <>
                            <Empty description="No data available"/>
                            {isLoading && <Loader size={"small"}/>}
                        </>
                    ) : (
                        <AllPosts />
                    )
            }
            <Pagination
                current={page}
                pageSize={limit}
                total={totalPosts}
                onChange={handlePageChange}
                hideOnSinglePage={true}
                disabled={isLoading}
            />
            <Select
                placeholder="Select pages size"
                disabled={totalPosts <= 5}
                onChange={selectedPageSizeHandler}
                options={PaginationSelectOptions}
            />
        </div>
    );
};

export default PostsList;
