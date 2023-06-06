import axios from "../axios";
const roomServices = {
  async createRoom(id, data) {
    console.log("id", id);
    console.log("data", data);

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
};

export default roomServices;
