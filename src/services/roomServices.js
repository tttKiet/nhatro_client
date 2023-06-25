import axios from "../axios";
const roomServices = {
  // async createRoom(id, data) {
  //   // console.log("id", id);
  //   // console.log("data", data);

  //   const res = await axios.post(`/api/v1/board-house/room/create/${id}`, data);
  //   return res.data;
  // },
  async createRoom({ id, files, data }) {
    console.log("Data", data);
    let formData = new FormData();
    formData.append("description", data.description);
    formData.append("isLayout", data.isLayout);
    formData.append("number", data.number);
    formData.append("size", data.size);
    formData.append("price", data.price);

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    try {
      const res = await axios.post(
        `/api/v1/board-house/room/create/${id}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },
  async getAllRoomsByAdminId(adminId) {
    const res = await axios.get(`/api/v1/board-house/room?adminId=${adminId}`);
    return res.data;
  },
  async deleteRoom(roomId) {
    const res = await axios.delete(`/api/v1/board-house/room/delete/${roomId}`);
    return res.data;
  },
  async updateRoom(roomId, dataRoom) {
    const res = await axios.patch(
      `/api/v1/board-house/room/update/${roomId}`,
      dataRoom
    );
    return res.data;
  },
};

export default roomServices;
