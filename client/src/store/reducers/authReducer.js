import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import AuthService from "../../services/AuthService";
import { message } from "antd";

const loginUser = async (email, password) => {
    return await AuthService.login(email, password);
};

const registerUser = async (email, password) => {
    return await AuthService.registration(email, password);
};

const logoutUser = async () => {
    return await AuthService.logout();
};

const refreshUserToken = async () => {
    return await AuthService.getUserByToken();
};

export const login = createAsyncThunk("auth/login", async (credentials) => {
    try {
        const response = await loginUser(credentials.email, credentials.password);
        Cookies.set("accessToken", response.data.accessToken, { expires: 3600000 });
        message.success("Successfully logged in !");
        return response.data.user;
    } catch (error) {
        message.error("Login failed, password or email is wrong!");
        throw error;
    }
});

export const registration = createAsyncThunk("auth/registration", async (userData) => {
    try {
        const {email, password} = userData;
        const response = await registerUser(email, password);
        Cookies.set("accessToken", response.data.accessToken, {expires: 3600000});
        message.success("Successfully registered !");
        return response.data.user;
    } catch (error) {
        message.error("Email is already registered");
        throw error;
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        await logoutUser();
        Cookies.remove("accessToken");
        return null;
    } catch (error) {
        throw error;
    }
});

export const refresh = createAsyncThunk("auth/refresh", async () => {
    try {
        const response = await refreshUserToken();
        Cookies.set("accessToken", response.data.accessToken, {expires: 3600000});
        return response.data.user;
    } catch (error) {
        throw error;
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuth: false,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(registration.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(registration.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuth = false;
            })
            .addCase(logout.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(refresh.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(refresh.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default authSlice.reducer;
