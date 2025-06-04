import axios from "axios";

//const apiUrl = import.meta.env.VITE_API_URL;
const instance = axios.create({
  //baseURL: "http://34.236.148.24:5000/api",
  baseURL: "http://localhost/api",
  //baseURL: apiUrl,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config!.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
