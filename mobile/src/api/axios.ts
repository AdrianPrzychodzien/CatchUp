import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const jwt = Cookies.get("jwt");

const axiosInstance = axios.create();
axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + jwt;
const API_URL = `${process.env.BACKEND_URL}/api/v1/`;

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.baseURL = API_URL;
    config.timeout = 10000;
    // config.withCredentials = true;
    axios.defaults.withCredentials = process.env.NODE_ENV !== "development";
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // After refresh token expired
    if (error.response?.status === 401 && error.response?.data.message === "Token is invalid") {
      Cookies.remove("jwt");
      Cookies.remove("current_user_session");
      window.location.href = "/signin";

      return Promise.reject(error);
    }

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const data = await axiosInstance.post("/refresh_token");
      const accessToken = (data as any).data.accessToken;

      if (accessToken) {
        Cookies.set("jwt", accessToken);
        originalRequest.__isRetryRequest = true;
        originalRequest.headers["Authorization"] = "Bearer " + accessToken;
        axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      }
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const isAxiosError = axios.isAxiosError;

export default axiosInstance;
