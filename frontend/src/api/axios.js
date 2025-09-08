import axios from "axios";

const instance = axios.create({
  /*baseURL: "https://mindsoothe-api.onrender.com/api", */
    baseURL: "http://127.0.0.1:8000/api/",
    withCredentials: true,
});


instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
