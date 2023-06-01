import axios from "../axios";
const boardHouseServices = {
  async getBoardHouseById(adminId) {
    console.log(adminId);
    const res = await axios.get(`/api/v1/board-house?adminId=${adminId}`);
    return res.data;
  },
  async updateBoardHouse(adminId, boardHouseId, data) {
    const res = await axios.patch(
      `/api/v1/board-house/update?adminId=${adminId}&boardHouseId=${boardHouseId}`,
      data
    );
    return res.data;
  },
};

export default boardHouseServices;
