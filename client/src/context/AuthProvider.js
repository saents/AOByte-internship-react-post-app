// OLD CODES, ALL IS MOVED TO REDUX

// import React, { createContext, useState } from "react";
// import Cookies from "js-cookie";
// import AuthService from "../services/AuthService";
// import { useNavigate } from "react-router-dom";
// import { routesData } from "../constants/routesData";
// import { message } from "antd";
//
//
// const AuthContext = createContext();
//
// function AuthProvider({children}) {
//     const [user, setUser] = useState(null);
//     const [isAuth, setIsAuth] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//
//     const navigate = useNavigate();
//
//     const login = async (email, password) => {
//         try {
//             setIsLoading(true);
//             const response = await AuthService.login(email, password);
//             Cookies.set("accessToken", response.data.accessToken);
//             setIsAuth(true);
//             setUser(response.data.user);
//             setIsLoading(false);
//             message.success('Successfully logged in !');
//         } catch (e) {
//             setIsLoading(false);
//             message.error('Login failed, password or email is wrong!');
//             return e.response?.data?.message;
//         }
//     };
//
//     const registration = async (email, password) => {
//         try {
//             const response = await AuthService.registration(email, password);
//             Cookies.set("accessToken", response.data.accessToken, {expires: 10});
//             setIsAuth(true);
//             setUser(response.data.user);
//             message.success('Successfully registered !');
//             return response;
//         } catch (e) {
//             message.error('Email is already registered');
//             console.log(e.response?.data?.message);
//         }
//     };
//
//     const logout = async () => {
//         try {
//             await AuthService.logout();
//             Cookies.remove("accessToken");
//             setIsAuth(false);
//             setUser(null);
//             navigate(routesData.login.url);
//         } catch (e) {
//             console.log(e.response?.data?.message);
//         }
//     };
//
//     const refresh = async () => {
//         try {
//             setIsLoading(true);
//             const response = await AuthService.getUserByToken();
//             Cookies.set("accessToken", response.data.accessToken);
//             setIsAuth(true);
//             setUser(response.data.user);
//             setIsLoading(false);
//         } catch (e) {
//             setIsLoading(false);
//             console.log(e.response?.data?.message);
//         }
//     };
//
//     const authContextValue = {
//         user, isAuth, login, registration, logout, refresh, isLoading
//     };
//
//     return (
//         <AuthContext.Provider value={authContextValue}>
//             {children}
//         </AuthContext.Provider>
//     );
// }
//
// export { AuthContext, AuthProvider };
