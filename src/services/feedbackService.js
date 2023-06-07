import axios from "../axios";

const feedbackService = {
  async createFeedback(_id,data) {
    console.log(_id,data)
  const res = await axios.post(`/api/v1/user/feedback/create/${_id}`, data);
    return res.data;
  },
}
export default feedbackService