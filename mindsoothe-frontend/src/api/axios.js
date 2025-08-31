import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", 
});

api.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem("tokens");
    if (tokens) {
      const access = JSON.parse(tokens).access;
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
