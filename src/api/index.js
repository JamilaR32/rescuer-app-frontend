import axios from "axios";

const BASE_URL = "http://localhost:8081/api";

const instance = axios.create({
  baseURL: BASE_URL,
});

export { BASE_URL, instance };
