import { instance } from ".";

const me = async () => {
  const { data } = await instance.get("/user/profile");
  return data;
};

export { me };
