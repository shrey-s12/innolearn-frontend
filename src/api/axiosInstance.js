import axios from "axios";

const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const axiosInstance = axios.create({
  baseURL: MAIN_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;
