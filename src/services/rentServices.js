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

  async getRentRoomUser({ userId }) {
    const res = await axios.get(`/api/v1/user/${userId}/room/rent`);
    return res;
  },

  async deleteRent({ _id }) {
    const res = await axios.delete(`/api/v1/rent/${_id}`);
    return res;
  },
};
export default rentServices;
