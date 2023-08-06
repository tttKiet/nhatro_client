import axios from "../axios";
const boardHouseServices = {
  async getBoardHouseById(adminId) {
    const res = await axios.get(`/api/v1/board-house?adminId=${adminId}`);
    return res.data;
  },
  async updateBoardHouse(boardHouseId, data, fileImgs) {
    let formData = new FormData();
    formData.append("address", data.address);
    formData.append("electricPrice", data.electricPrice);
    formData.append("waterPrice", data.waterPrice);
    formData.append("name", data.name);
    formData.append("phone", data.phone);

    // img to delete
    const imgToDelete = data.images
      .filter((url) => !data.originalImage.includes(url))
      .concat(data.originalImage.filter((url) => !data.images.includes(url)))
      .filter((url) => url.includes("https"));
    formData.append("imgToDelete", imgToDelete);

    //  img to upload
    if (fileImgs.length > 0) {
      for (let i = 0; i < fileImgs.length; i++) {
        formData.append("images", fileImgs[i]);
      }
    }

    try {
      const res = await axios.patch(
        `/api/v1/board-house/update/${boardHouseId}`,
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

  async getBoardHousePage({ page }) {
    const res = await axios.get(`/api/v1/board-house/page/${page}`);
    return res;
  },

  async getBoardHouseInfoById({ id }) {
    const res = await axios.get(`/api/v1/board-house/${id}`);
    return res;
  },

  async getRatingAndPrice(boardHouseId) {
    const res = await axios.get(
      `api/v1/board-house/${boardHouseId}/rating-price`
    );
    return res;
  },
};

export default boardHouseServices;
