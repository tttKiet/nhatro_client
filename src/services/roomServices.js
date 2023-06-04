import axios from "../axios";
const roomServices = {
  async getAllRoomsByAdminId(adminId) {
    const res = await axios.get(`/api/v1/board-house/room?adminId=${adminId}`);
    return res.data;
  },
};

export default roomServices;
