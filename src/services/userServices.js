import axios from "../axios";

const userServices = {
  async createUser(data) {
    const res = await axios.post("/api/v1/users/create", data);
    return res.data;
  },

  async login({ phone, pass }) {
    const res = await axios.post("/api/v1/user/login", { phone, pass });
    return res.data;
  },
};

export default userServices;
