import axios from "../axios";

const reqRoomOwnerServices = {
  async createReqBoardHouse({ files, data }) {
    let formData = new FormData();
    formData.append("description", data.description);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("electric", data.electric);
    formData.append("water", data.water);
    formData.append("options", data.options);

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const res = await axios.post(
        `/api/v1/user/${data.userId}/create-req-board-house`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getAllRequests(rootId) {
    try {
      const res = await axios.get(
        `/api/v1/root/all-request-board-house/${rootId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async accpectReq(reqId) {
    try {
      const res = await axios.patch(`/api/v1/root/accept-req/${reqId}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async rejectReq(reqId, boardHouseId, imgToDelete) {
    try {
      const res = await axios.delete(`/api/v1/root/reject-req/${reqId}`, {
        data: { boardHouseId, imgToDelete },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async createRoom({ id, files, data }) {
    let formData = new FormData();
    formData.append("description", data.description);
    formData.append("isLayout", data.isLayout);
    formData.append("number", data.number);
    formData.append("size", data.size);
    formData.append("price", data.price);

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    try {
      const res = await axios.post(
        `/api/v1/board-house/room/create/${id}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },
};

export default reqRoomOwnerServices;
