import { instance } from ".";
// import ROUTES from "../navigations";
import { saveToken } from "./storage";

const me = async () => {
  const { data } = await instance.get("/profile");
  return data;
};

const login = async (userInfo) => {
  //http://localhost:8080/api/login
  //rescuer-app-backend

  const res = await instance.post("/login", userInfo);
  const token = res.data.token;
  if (token) {
    saveToken(token);
    //
    // return
    //
  }

  //navigate here?!
  //navigation.navigate(ROUTES.AUTH.AUTH_NAVIGATION.HelperProfile);

  return res.data;
};
const register = async (userInfo) => {
  const res = await instance.post("/register", userInfo);
  if (res.token) {
    saveToken(res.data.token);
  }
  return res.data;
};
const registerHelper = async (userInfo) => {
  const res = await instance.post("/register-helper", userInfo);
  if (res.token) {
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
