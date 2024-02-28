import { instance } from ".";
<<<<<<< HEAD
import { saveToken } from "./storage";
=======

import { saveToken } from "./storage";

>>>>>>> c0ec7d4389d9549453e938054c2def7098def533

const me = async () => {
  const { data } = await instance.get("/user/profile");
  return data;
};

<<<<<<< HEAD
=======

>>>>>>> c0ec7d4389d9549453e938054c2def7098def533
const login = async (userInfo) => {
  const res = await instance.post("/login", userInfo);
  const token = res.data.token;
  if (token) {
    saveToken(token);
  }
  return res.data;
};
const register = async (userInfo) => {
  const res = await instance.post("/register", userInfo);
  if (res.token) {
    saveToken(res.data.token);
  }
  return res.data;
};

export { me, login, register };
<<<<<<< HEAD
=======

>>>>>>> c0ec7d4389d9549453e938054c2def7098def533
