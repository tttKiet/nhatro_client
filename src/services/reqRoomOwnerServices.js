import axios from "../axios";

const reqRoomOwnerServices = {
  async createReqBoardHouse(data, userId) {
    const { name, address, phone, electric, water, images, description } = data;

    const res = await axios.post(`/api/v1/user/create-req-board-house`, {
      name,
      address,
      phone,
      electric,
      water,
      images,
      description,
      userId,
    });
    return res.data;
  },

  async getAllRequests(rootId) {
    const res = await axios.get(
      `/api/v1/root/all-request-board-house/${rootId}`
    );
    return res.data;
  },

  async accpectReq(reqId) {
    const res = await axios.patch(`/api/v1/root/accept-req/${reqId}`);
    return res.data;
  },

  async rejectReq(reqId, boardHouseId) {
    const res = await axios.delete(`/api/v1/root/reject-req/${reqId}`, {
      data: { boardHouseId },
    });
    return res.data;
  },
};

export default reqRoomOwnerServices;
