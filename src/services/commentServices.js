import axios from "../axios";

const commentServices = {
  async createCmt({ content, userId, postId, parentId }) {
    const res = await axios.post(`/api/v1/comment`, {
      content,
      userId,
      postId,
      parentId,
    });
    return res;
  },
};

export default commentServices;
