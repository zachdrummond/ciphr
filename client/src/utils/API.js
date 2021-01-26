import axios from "axios";

const API = {
  addAlgorithm: function (algorithm) {
    return axios.post("/api/algorithm", algorithm);
  },
  deleteAlgorithm: function (id) {
    return axios.delete(`/api/algorithm/${id}`);
  },
  editAlgorithm: function (id, algorithm) {
    return axios.put(`/api/algorithm/${id}`, algorithm);
  },
  getAllAlgorithms: function (jwt) {
    const config = {
      headers: {
        Authorization: jwt,
      },
    };
    return axios.get("/api/algorithm", config);
  },
  getMyAlgorithms: function (jwt) {
    return axios.get(`/api/algorithm/user/${jwt}`);
  },
  getAlgorithm: function (id) {
    return axios.get(`/api/algorithm/${id}`);
  },
  postCode: function (input, lang) {
    return axios({
      method: "POST",
      url: "/api/code",
      data: { input, lang },
    });
  },
  login: function (userInfo) {
    return axios.post("/api/login", userInfo);
  },
  signup: function (userInfo) {
    return axios.post("/api/signup", userInfo);
  },
  deleteUser: function (jwt) {
    return axios.delete(`/api/user/${jwt}`);
  },
  editUser: function (jwt, title, userInfo) {
    if (title === "Update Password") {
      return axios.put(`/api/user/${jwt}`, { password: userInfo });
    } else if (title === "Update Username") {
      return axios.put(`/api/user/${jwt}`, { username: userInfo });
    }
  },
  star: function (id, status, user) {
    return axios({
      url: `/api/star/${id}`,
      method: "POST",
      data: {
        status,
        user,
      },
    });
  },
  getStar: function (id, user) {
    return axios({
      url: `/api/star/${id}/${user}`,
      method: "GET",
    });
  },
  starSolution: function (id, status, user) {
    return axios({
      url: `/api/solutionsStar/${id}`,
      method: "POST",
      data: {
        status,
        user,
      },
    });
  },
  getStar: function (id, user) {
    return axios({
      url: `/api/star/${id}/${user}`,
      method: "GET",
    });
  },
  postSolution: function (code, description, language, algorithmId, token) {
    return axios({
      url: `/api/solutions`,
      method: "POST",
      data: {
        code,
        description,
        language,
        algorithmId,
        token,
      },
    });
  },
  getStarredSolutions: function (user) {
    return axios({
      url: `/api/solutionsStar/${user}`,
      method: "GET",
    });
  },
  getSolutions: function (algorithmId) {
    return axios({
      url: `/api/solutions/${algorithmId}`,
      method: "GET",
    });
  },
};

export default API;
