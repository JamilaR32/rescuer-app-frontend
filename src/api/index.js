import axios from "axios";

const BASE_URL = "http://192.168.8.158:8000/api";

const instance = axios.create({
  baseURL: BASE_URL,
});

export { BASE_URL, instance };
