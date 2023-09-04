import React from "react";
import Search from "antd/es/input/Search";
import { Button, Select } from "antd";
import styles from "./SearchComp.module.scss";
import { SearchSelectOptions } from "../../../constants/SelectOptions";
import { useSelector } from "react-redux";


function SearchComp({
                        isSearching,
                        isEmptyFilteredData,
                        handleReset,
                        selectedSearchMethod,
                        handleSearch,
                        selectedSearchMethodChangeHandler,
                    }) {

    const posts = useSelector((state) => state.posts.posts);
    return (
        <div className={styles.search_comp}>
            {isSearching && <Button type="primary" loading={posts.isLoading} onClick={handleReset}> Reset </Button>}
            <span className={styles.search_component}>
        <Search
            placeholder={`Search ${selectedSearchMethod}`}
            onSearch={handleSearch}
            enterButton
        />
      </span>
            <Select
                className={styles.search_method}
                placeholder="Search method"
                defaultactivefirstoption={'true'}
                onChange={selectedSearchMethodChangeHandler}
                options={SearchSelectOptions}
            />
        </div>
    );
}

export default SearchComp;
