import { instance } from ".";

const pastRequests = async () => {
  const { data } = await instance.get("/requests/history/close");
  return data;
};

export { pastRequests };
