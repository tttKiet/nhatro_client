import axios from "../axios";

const reqRoomOwnerServices = {
  async createReqBoardHouse(data) {
    const res = await axios.post(`/api/v1/user/create-req-board-house`, {
      data,
    });
    return res.data;
  },

  async getAllRequests(rootId) {
    const res = await axios.get(
      `/api/v1/root/all-request-board-house/${rootId}`
    );
    return res.data;
  },
};

export default reqRoomOwnerServices;
