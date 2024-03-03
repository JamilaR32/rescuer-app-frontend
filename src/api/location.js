import { instance } from ".";

const nearbyRequests = async () => {
  const { data } = await instance.get("/nearestRequest");
  return data;
};

export { nearbyRequests };
