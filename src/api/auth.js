import { instance } from ".";
// import ROUTES from "../navigations";
import { saveToken } from "./storage";

const me = async () => {
  const res = await instance.get("/profile");
  return res.data;
};
const getAllUsers = async () => {
  const res = await instance.get("/users");
  return res.data;
};
const login = async (userInfo) => {
  //http://localhost:8080/api/login
  //rescuer-app-backend

  const res = await instance.post("/login", userInfo);
  const token = res.data.token;
  if (token) {
    //console.log("saving the token");
    saveToken(token);
  }

  //navigate here?!
  //navigation.navigate(ROUTES.AUTH.AUTH_NAVIGATION.HelperProfile);

  return res.data;
};
const register = async (userInfo) => {
  const res = await instance.post("/register", userInfo);
  if (res.data.token) {
    saveToken(res.data.token);
  }
  return res.data;
};
const registerHelperAPI = async (userInfo) => {
  const formData = new FormData();
  for (let key in userInfo) {
    if (key != "image") {
      formData.append(key, userInfo[key]);
    }
  }

  if (userInfo.image) {
    formData.append("image", {
      name: "image.jpg",
      type: "image/jpeg",
      uri: userInfo.image,
    });
  }

  const res = await instance.post("/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.data) {
    saveToken(res.data.token);
  }
  return res.data;
};

const editUserProfile = async (userInfo) => {
  const res = await instance.put("/profile", userInfo);
  const token = res.data.token;
  if (token) {
    saveToken(token);
  }
  return res.data;
};

const getUserByHelperId = async (_id) => {
  const res = await instance.get(`/getUserByHelperId/${_id}`);
  return res.data;
};

export {
  me,
  login,
  register,
  editUserProfile,
  getAllUsers,
  registerHelperAPI,
  getUserByHelperId,
};
