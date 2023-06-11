import axios from "../axios";
const cloudinaryServices = {
  async uploadImage(base64) {
    const res = await axios.post(`/api/v1/upload-image`, { image: base64 });
    return res.data;
  },
  async uploadImages(images) {
    const res = await axios.post(`/api/v1/upload-images`, { images });
    return res.data;
  },
  async deleteImage(imageLink) {
    const res = await axios.delete(`/api/v1/delete-image`, {
      data: { imageLink },
    });
    return res.data;
  },
};

export default cloudinaryServices;
