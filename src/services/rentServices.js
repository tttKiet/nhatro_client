import axios from "../axios";

const rentServices = {
  async createRent({ roomId, userId, startDate }) {
    const res = await axios.post(`/api/v1/room/${roomId}/rent`, {
      userId,
      startDate,
    });
    return res;
  },

  async getRent({ userId }) {
    const res = await axios.get(`/api/v1/room/all-rent?userId=${userId}`);
    return res;
  },
};
export default rentServices;
