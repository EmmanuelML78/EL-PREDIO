import axios from "axios";

const instance = axios.create({
  baseURL: "el-predio-production-32b7.up.railway.app/",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
