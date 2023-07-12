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

  async getComment(postId, page = 1) {
    const res = await axios.get(`/api/v1/post/${postId}/comment?page=${page}`);
    return res;
  },

  async getCommentById(parentId, page = 1, all = "") {
    const res = await axios.get(
      `/api/v1/comment/${parentId}/child?page=${page}&type=${all}`
    );
    return res;
  },

  async editComment(id, content) {
    const res = await axios.patch(`/api/v1/comment/${id}`, { content });
    return res;
  },

  async deleteComment(id) {
    const res = await axios.delete(`/api/v1/comment/${id}`);
    return res;
  },

  async getLimitComments(postId) {
    const res = await axios.get(`/api/v1/comment/limit?postId=${postId}`);
    return res;
  },
};

export default commentServices;
