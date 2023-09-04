import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import PostService from "../../services/PostService";

export const getAll = createAsyncThunk('post/get-all', async (_, {getState}) => {
    try {
        const { page, limit, sort, filter } = getState().posts;
        const response = await PostService.getAll(page, limit, sort, filter);
        console.log(page, limit, sort, filter);
        window.scrollTo({
            top: 0,
            behavior: "smooth"})
        return response.data;
    } catch (error) {
        message.error("Error while getting posts..");
    }
});

export const getUserPosts = createAsyncThunk('post/get-all', async (_, {getState}) => {
    try {
        const { page, limit, sort, filter } = getState().posts;
        const response = await PostService.getAll(page, limit, sort, filter);
        return response.data;
    } catch (error) {
        message.error("Error while getting posts..");
    }
});

export const create = createAsyncThunk('post/create', async (postData) => {
    try {
        await PostService.create(postData);
        message.success("Post created successfully!");
        return postData;
    } catch (error) {
        message.error("Failed to create the post.");
        throw error;
    }
});

export const search = createAsyncThunk('post/search', async (searchData) => {
    try {
        const {searchQuery, selectedKey} = searchData;
        const response = await PostService.search(searchQuery, selectedKey);
        const postsData = response.data;
        return postsData;
    } catch (e) {
        message.error("An error occurred while searching");
        ;
    }
});


const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        allPostsDataLength: 0,
        isLoading: false,
        page: 1,
        limit: 5,
        totalPosts: 1,
        sort: 'creationDate',
        filter: ['category', 'general']
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setLimit: (state, action) => {
            state.page = 1;
            state.limit = action.payload;
        },
        setSortOption: (state, action) => {
            state.sort = action.payload
        },
        setFilterOption: (state, action) => {
            state.filter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload.posts;
                state.totalPosts = action.payload.totalPosts;
            })
            .addCase(getAll.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(create.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts.push(action.payload);
            })
            .addCase(create.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(search.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(search.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload.posts;
                state.totalPosts = action.payload.totalPosts;
            })
            .addCase(search.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setPage, setLimit, setSortOption, setFilterOption } = postsSlice.actions;

export default postsSlice.reducer;
