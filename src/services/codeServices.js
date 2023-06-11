import axios from "../axios";

const codeServices = {
  async verifyCodeEmail(code, email, userId) {
    const res = await axios.post(`/api/v1/user/verify/email/verify-code`, {
      code,
      email,
      userId,
    });
    return res;
  },

  async checkExistCodeForEmail(email) {
    const res = await axios.post(`/api/v1/user/verify/email/check-exist-code`, {
      email,
    });
    return res;
  },
};

export default codeServices;
