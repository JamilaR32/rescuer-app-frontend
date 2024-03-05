import { instance } from ".";

const updateToken = async (token) => {
  const res = await instance.put("/notification-token", { token });
  return res.data;
};

export { updateToken };
