import React, { useEffect, useState } from "react";
import { Cascader, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import PostsList from "./PostsList/PostsList";
import SearchComp from "./SearchComp/SearchComp";
import PostCreate from "./PostCreate/PostCreate";

import { getAll, search, setSortOption, setFilterOption } from "../../store/reducers/postsReducer";
import { postsFilteringSearchOptions, postsSortingSearchOptions } from "../../constants/SelectOptions";

import styles from "./PostsBoard.module.scss";
import UserService from "../../services/UserService";
import ActivateNotification from "./ActivateNotification/ActivateNotification";

const PostsBoard = () => {
    const {posts, isLoading} = useSelector(state => state.posts);
    const {user} = useSelector(state => state.auth);

    const [selectedSearchMethod, setSelectedSearchMethod] = useState("title");
    const [filtersSelectOptions, setFiltersSelectOptions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const dispatch = useDispatch();

    const userList = async () => {
        const userList = await UserService.getAll();
        const userListOptions = userList.data.map(user => {
            return {
                value: user,
                label: user
            }
        });
        const newOptionsArr = postsFilteringSearchOptions.find(option => option.value === "author");
        newOptionsArr.children = userListOptions;
        setFiltersSelectOptions(postsFilteringSearchOptions);
    };

    useEffect(() => {
        userList()
    }, [])

    const handleSearch = async (searchQuery) => {
        if (!searchQuery) {
            return;
        }
        const searchData = {searchQuery, selectedKey: selectedSearchMethod};

        await dispatch(search(searchData));

        setIsSearching(true);
    };

    const handleReset = async () => {
        await dispatch(getAll());
        setIsSearching(false);
    };

    const selectedSearchMethodChangeHandler = (value) => {
        setSelectedSearchMethod(value);
    };

    const handleSortChange = (value) => {
        dispatch(setSortOption(value))
    };

    const handleFilterChange = (value) => {
        dispatch(setFilterOption(value))
    };

    return (
        <div className={styles.posts_board}>
            <div className={styles.posts_board_actions}>
                {
                    user.isActivated ? <PostCreate/> : <ActivateNotification />
                }
                <Select defaultactivefirstoption={'true'}
                        loading={isLoading}
                        placeholder={'Sort Options'}
                        style={{width: 150}}
                        onChange={handleSortChange}
                        options={postsSortingSearchOptions}
                />
                <Cascader placeholder={'Filter Options'}
                          loading={isLoading}
                          style={{width: 150}}
                          onChange={handleFilterChange}
                          options={filtersSelectOptions}
                          expandTrigger="hover"
                />
                <SearchComp
                    isSearching={isSearching}
                    isEmptyFilteredData={!posts.length}
                    handleReset={handleReset}
                    selectedSearchMethod={selectedSearchMethod}
                    selectedSearchMethodChangeHandler={selectedSearchMethodChangeHandler}
                    handleSearch={handleSearch}
                />
            </div>
            <div className={styles.posts_board_posts_list}>
                <PostsList />
            </div>
        </div>
    );
};

export default PostsBoard;
