import axios from "axios";
import Cookies from "js-cookie";
import { ApiRoutes } from "../constants/apiRoutes";


const api = axios.create({
    withCredentials: true,
    baseURL: ApiRoutes.baseUrl,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${Cookies.get("accessToken")}`;
    return config;
});

export default api;
