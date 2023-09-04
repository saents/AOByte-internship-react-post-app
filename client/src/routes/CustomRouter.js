import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import { routesData } from "../constants/routesData";
import PostsPage from "../pages/PostsPage/PostsPage";
import AccountPage from "../pages/AccountPage/AccountPage";
import { useSelector } from "react-redux";
// import UserPostsPage from "../pages/UserPostsPage/UserPostsPage";


const CustomRouter = () => {
    const isAuth = useSelector((state) => state.auth.isAuth);

    return (
        <Routes>
            {
                isAuth ?
                    <>
                        <Route path={routesData.posts.url} element={<PostsPage/>}/>
                        <Route path={routesData.account.url} element={<AccountPage/>}/>
                        <Route path={routesData.notExist.url} element={<Navigate to={routesData.posts.url}/>}/>
                    </> :
                    <>
                        <Route path={routesData.login.url} element={<LoginPage/>}/>
                        <Route path={routesData.registration.url} element={<RegistrationPage/>}/>
                        <Route path={routesData.notExist.url}

                               element={<Navigate to={routesData.login.url}/>}
                        />
                    </>

            }
        </Routes>
    );
};

export default CustomRouter;
