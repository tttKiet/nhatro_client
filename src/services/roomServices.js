import axios from "../axios";
const roomServices = {
  async createRoom(id, data) {
    // console.log("id", id);
    // console.log("data", data);

    const res = await axios.post(`/api/v1/board-house/room/create/${id}`, data);
    return res.data;
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
