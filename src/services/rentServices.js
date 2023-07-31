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

  async getRentsFromBoardHouseId(boardHouseId) {
    try {
      const res = await axios.get(
        `/api/v1/board-house/all-rent/${boardHouseId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async acceptReqRent(reqId) {
    try {
      const res = await axios.patch(`/api/v1/rent/${reqId}/accept`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async rejectReqRent(reqId) {
    try {
      const res = await axios.patch(`/api/v1/rent/${reqId}/reject`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteRent({ _id }) {
    const res = await axios.delete(`/api/v1/rent/${_id}`);
    return res;
  },
};
export default rentServices;
