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

  async editPost({ _id, content, files, hashTag = undefined, postId }) {
    let formData = new FormData();
    formData.append("content", content);
    if (hashTag && hashTag !== "#notag") {
      formData.append("hashTag", hashTag);
    } else {
      formData.append("hashTag", "");
    }
    formData.append("postId", postId);
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    try {
      const res = await axios.patch(`/api/v1/user/${_id}/edit-post`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return res;
    } catch (err) {
      console.error(err);
    }
  },

  async getPostPage({ page = 1 }) {
    try {
      const res = await axios.get(`/api/v1/posts?page=${page}`);
      return res;
    } catch (err) {
      console.error(err);
    }
  },

  async getPostPageById(postId) {
    try {
      const res = await axios.get(`/api/v1/post/${postId}`);
      return res;
    } catch (err) {
      console.error(err);
    }
  },

  async getUserNewPost({ _author, index = 1 }) {
    try {
      const res = await axios.get(
        `/api/v1/users/${_author}/posts?index=${index}`
      );
      return res;
    } catch (err) {
      console.error(err);
    }
  },

  async getPostUser({ _author, page = undefined }) {
    try {
      const res = await axios.get(
        `/api/v1/users/${_author}/posts?page=${page}`
      );
      return res;
    } catch (err) {
      console.error(err);
    }
  },

  async getLike({ postId }) {
    try {
      const res = await axios.get(`/api/v1/post/${postId}/like`);
      return res;
    } catch (err) {
      console.error(err);
    }
  },
};

export default postServices;
