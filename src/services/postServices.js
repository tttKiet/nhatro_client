import axios from "../axios";

const postServices = {
  async createPost({ _id, content, files, hashTag = undefined }) {
    let formData = new FormData();
    formData.append("content", content);
    hashTag && hashTag !== "#notag" && formData.append("hashTag", hashTag);
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    try {
      const res = await axios.post(`/api/v1/user/${_id}/up-post`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return res;
    } catch (err) {
      console.error(err);
    }
  },
};

export default postServices;
