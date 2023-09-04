import { combineReducers } from "@reduxjs/toolkit";

import AuthReducer from "./authReducer";
import PostsReducer from "./postsReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    posts: PostsReducer,
});

export default rootReducer;
