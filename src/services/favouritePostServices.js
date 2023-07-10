import axios from "../axios";

const favouritePostServices = {
  async addFavouritePost(_id, postId) {
    try {
      const res = await axios.post(
        `/api/v1/user/${_id}/add-favourite-post?postId=${postId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getFavouritePost(_id) {
    try {
      const res = await axios.get(`/api/v1/user/${_id}/favourite-post`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async removeFavouritePost(_id, fvPostId) {
    try {
      const res = await axios.delete(
        `/api/v1/user/${_id}/remove-favourite-post?fvPostId=${fvPostId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
export default favouritePostServices;
