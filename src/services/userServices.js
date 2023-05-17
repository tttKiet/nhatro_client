import axios from "../axios";

const userServices = {
  async createUser(data) {
    console.log("lot: ", data);
    const res = await axios.post("/api/v1/users/create", data);
    return res.data;
  },
};

export default userServices;
