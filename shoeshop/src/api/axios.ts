import axios from "axios";
import { deleteUSerToken, getUserToken } from "../utils/userManager";
import { errorHandler } from "../utils/errorHandler";
import { navigateTo } from "../utils/navigation";
import { API_BASE_URL } from "../utils/constants";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 2000,
});

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getUserToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    errorHandler(error);
    console.log(error);
    if (error.response?.status === 403 || error.response?.status === 401) {
      deleteUSerToken();
      navigateTo("logIn");
    }
    return Promise.reject(error);
  }
);
