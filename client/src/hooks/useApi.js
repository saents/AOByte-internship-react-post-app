import { useState } from "react";
import api from "../api";

const useApi = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (url) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.get(url);
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const createData = async (url, body) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.post(url, body);
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const updateData = async (url, body) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.put(url, body);
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteData = async (url) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.delete(url);
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {data, loading, error, fetchData, createData, updateData, deleteData};
};

export default useApi;
