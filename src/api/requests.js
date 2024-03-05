import { instance } from ".";

const pastRequests = async () => {
  const { data } = await instance.get("/requests/history/close");
  return data;
};
// need a lot of work
const getAllRequests = async () => {
  const { data } = await instance.get("/requests");
  // //console.log("data", data);
  return data;
};
const createRequest = async (userInfo) => {
  const res = await instance.post("/requests", userInfo);
  const token = await res.data.token;
  if (token) {
    saveToken(token);
  }
  return res.data;
};

const acceptRequest = async (_id, lat, lon) => {
  const res = await instance.put(`/requests/${_id}`, { lat, lon });
  return res.data;
};

const checkRequest = async () => {
  const res = await instance.get("/requests/getIfIHaveRequest");
  return res.data;
};
// need a lot of work
export {
  pastRequests,
  createRequest,
  getAllRequests,
  acceptRequest,
  checkRequest,
};
