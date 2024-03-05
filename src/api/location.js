import { instance } from ".";

const nearbyRequests = async () => {
  //console.log("first");
  const { data } = await instance.get("/nearestRequest");
  //   //console.log("teesttt", data);
  return data;
};

const updateHelperLocation = async (userInfo) => {
  const res = await instance.put("/updateHelperLocation", userInfo);
  const token = await res.data.token;
  if (token) {
    saveToken(token);
  }
  return res.data;
};
export { nearbyRequests, updateHelperLocation };
