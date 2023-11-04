import axios from "axios";
import { accessToken } from "@/store";
import type { AxiosInstance } from 'axios';
// create Axios instance

// create Axios interceptor, add bearear automaticly
function createAxiosInstance(token: string): Function {
    let instance: AxiosInstance | null = null;
    function getAxiosInstance(): AxiosInstance {
        if (!instance) {
            instance = axios.create({
                baseURL: 'https://api.spotify.com/v1/',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }
        instance.interceptors.request.use((config) => {
            return config;
        }), (error: any) => {
            return Promise.reject(error);
        }
        return instance;
    }
    return getAxiosInstance;
}

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
    const tokenStore = accessToken();
    config.headers['Authorization'] = tokenStore.accessToken.access_token;
    return config;
}, (err) => Promise.reject(err));

export { createAxiosInstance, axiosInstance };