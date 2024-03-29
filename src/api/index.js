import axios from "axios";
import { getToken } from "./storage";

const BASE_URL = "http://172.20.10.4:8000/api";
const BASE_URL2 = "http://172.20.10.4:8000";
const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  //console.log(config);
  return config;
});

export { BASE_URL, instance, BASE_URL2 };
