import axios from "../axios";

const userServices = {
  async createUser(data) {
    const res = await axios.post("/api/v1/users/create", data);
    return res.data;
  },

  async login(data) {
    const res = await axios.post("/api/v1/user/login", {
      email: data.email,
      password: data.password,
    });
    return res.data;
  },

  async loginWithSocial(token) {
    const res = await axios.post("/api/v1/user/login/social", {
      token,
    });
    return res;
  },

  async loggout() {
    const res = await axios.get("/api/v1/loggout");
    return res.data;
  },

  async sendCodeEmail(userId, email) {
    const res = await axios.post("/api/v1/user/verify/email/send-code", {
      userId,
      email,
    });

    return res;
  },

  async getProfile() {
    const res = await axios.get("/api/v1/profile");
    return res.data;
  },

  async updateProfile(_id, data) {
    const res = await axios.patch(`/api/v1/users/${_id}`, data);
    return res;
  },

  async getAllUsers() {
    const res = await axios.get("/api/v1/users/all-users");
    return res.data;
  },

  async getUserById(id) {
    const res = await axios.get(`/api/v1/user?_id=${id}`);
    return res.data;
  },

  async updateUser(id, data) {
    const res = await axios.patch(`/api/v1/user?_id=${id}`, data);
    return res.data;
  },

  async deleteUser(_id) {
    const res = await axios.delete(`/api/v1/user/delete/${_id}`);
    return res.data;
  },

  async psermissionsAccount(_id) {
    const res = await axios.get(`/api/v1/permissions/user/${_id}`);
    return res.data;
  },

  async getAllReqOwner(_id) {
    const res = await axios.get(`/api/v1/user/${_id}/all-request-board-house`);
    return res;
  },

  // Upload avatar
  async uploadAvatar(id, files, imgToDelete) {
    let formData = new FormData();
    formData.append("id", id);

    formData.append("images", files);

    formData.append("imgToDelete", imgToDelete);

    try {
      const res = await axios.patch("/api/v1/user/change-avatar", formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userServices;
