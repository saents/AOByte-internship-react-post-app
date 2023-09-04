import React, { useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import FullscreenLoading from "./components/FullscreenLoading/FullscreenLoading";
import Footer from "./components/Footer/Footer";

import CustomRouter from "./routes/CustomRouter";

import "./App.scss";

import { useDispatch, useSelector } from "react-redux";
import { refresh } from "./store/reducers/authReducer";

const App = () => {
    const isAuthLoading = useSelector(state => state.auth.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refresh());
    }, [dispatch]);

    return (
        <div className="App">
            {
                isAuthLoading ?
                    <FullscreenLoading/> :
                    <>
                        <Navbar/>
                        <CustomRouter/>
                        <Footer />
                    </>
            }
        </div>
    );
};

export default App;
