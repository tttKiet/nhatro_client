import axios from "../axios";

const billServices = {
  async getBillOnMonth({ month, boardHouseId }) {
    const res = await axios.get(`/api/v1/bill/for-boardhouse`, {
      params: {
        boardHouseId: boardHouseId,
        date: month,
      },
    });
    return res;
  },
  async saveBill({ electric, water, rentId, billId }) {
    const res = await axios.post(`/api/v1/bill/create`, {
      electric,
      water,
      rentId,
      billId,
    });
    return res;
  },

  async getillByRentId({ rentId }) {
    const res = await axios.get(`/api/v1/bill/rent/${rentId}`);
    return res;
  },

  async getRoomFromBillId({ billId }) {
    const res = await axios.get(`/api/v1/bill/${billId}/room`);
    return res.data;
  },
};

export default billServices;
