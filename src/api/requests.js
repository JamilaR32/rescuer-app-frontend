import { instance } from ".";

const pastRequests = async () => {
  const { data } = await instance.get("/requests/history/close");
  return data;
};
// need a lot of work
const getAllRequests = async () => {
  const { data } = await instance.get("/requests");
  console.log("ata", data);
  return data;
};
//
const fetchRequest = async (req, res, next) => {
  try {
    const { Request } = await instance.get("/requests/:_id");
    return res.status(200).json(req.Request);
  } catch (error) {
    next(error);
  }
};
//
const createRequest = async (req, res, next) => {
  try {
    //needs adjustment, not sure about it.
    if (req.file) {
      req.body.userImage = req.filepath;
    }
    //needs adjustment, not sure about it.

    const { request } = await instance.post("/requests");
    return res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

const deleteRequest = async (req, res, next) => {
  try {
    const res = await instance.delete("/requests/:_id");
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
//
const updateRequest = async (req, res, next) => {
  try {
    await req.instance.put("/requests/close/:_id");
    return res.status(204).end();
  } catch (error) {}
};
//
const assignRequest = async (req, res, next) => {
  const { assignedRequest } = await instance.put("/requests/:_id");
  return assignedRequest;
};

const reupdateRequest = async (req, res, next) => {
  const { Request } = await instance.put("/requests/open/:_id");
  return Request;
};
// need a lot of work
export {
  pastRequests,
  createRequest,
  assignRequest,
  getAllRequests,
  fetchRequest,
  deleteRequest,
  updateRequest,
  reupdateRequest,
};
