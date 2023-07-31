import axios from "../axios";

const feedbackOfBoardHouseServices = {
  async createFeedback(_id, userId, data) {
    try {
      const res = await axios.post(
        `/api/v1/boardHouse/${_id}/create-feedback?user=${userId}`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async checkAlreadyFeedback(userId, boardHouseId) {
    try {
      const res = await axios.get(
        `/api/v1/board-house/${boardHouseId}/user-feedback?user=${userId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateFeedback(feedbackId, data) {
    try {
      const res = await axios.patch(
        `/api/v1/user/feedback-boardhouse/update/?feedback=${feedbackId}`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteFeedback(feedbackId) {
    try {
      const res = await axios.delete(
        `/api/v1/user/feedback-boardhouse/delete/?feedback=${feedbackId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getAllFeedback(boardHouseId) {
    try {
      const res = await axios.get(
        `/api/v1/boardhouse/${boardHouseId}/all-feedbacks`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
export default feedbackOfBoardHouseServices;
