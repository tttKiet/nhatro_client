import axios from "../axios";

const feedbackService = {
  async createFeedback(_id,data) {
  const res = await axios.post(`/api/v1/user/feedback/create/${_id}`, data);
    return res.data;
  },


  async readFeedback(_id) {
    const res = await axios.get(`/api/v1/user/feedback/read/${_id}`);
      return res.data;
    },

}
export default feedbackService