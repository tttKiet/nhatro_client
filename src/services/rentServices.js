import axios from "../axios";

const rentServices = {
  async createRent({ roomId, userId, startDate }) {
    const res = await axios.post(`/api/v1/room/${roomId}/rent`, {
      userId,
      startDate,
    });
    return res;
  },
};
export default rentServices;
