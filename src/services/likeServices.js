import axios from "../axios";

const likeServices = {
  async toggleLikePost({ userId, postId }) {
    const res = await axios.post(`/api/v1/post/${postId}/like`, {
      userId,
    });
    return res;
  },
};
export default likeServices;
