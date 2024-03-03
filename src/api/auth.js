import { instance } from ".";
import { saveToken } from "./storage";

const me = async () => {
  const { data } = await instance.get("/profile");
  return data;
};

const login = async (userInfo) => {
  const res = await instance.post("/login", userInfo);
  const token = res.data.token;
  if (res.data.token) {
    saveToken(res.data.token);
  }
  return res.data;
};
const register = async (userInfo) => {
  const res = await instance.post("/register", userInfo);
  if (res.data.token) {
    saveToken(res.data.token);
  }
  return res.data;
};
const registerHelper = async (userInfo) => {
  const res = await instance.post("/register-helper", userInfo);
  if (res.data.token) {
    saveToken(res.data.token);
  }
  return res.data;
};

const editUserProfile = async (userInfo) => {
  const res = await instance.put("/profile/:userId", userInfo);
  const token = res.data.token;
  if (token) {
    saveToken(token);
  }
  return res.data;
};

export { me, login, register, editUserProfile };
