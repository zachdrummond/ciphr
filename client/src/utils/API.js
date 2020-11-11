import axios from "axios";

const API = {
  getAllAlgorithms: function () {
    return axios.get("/api/algorithm");
  },
  getMyAlgorithms: function (jwt) {
    return axios.get(`/api/algorithm/user/${jwt}`);
  },
  getAlgorithm: function (id) {
    return axios.get(`/api/algorithm/${id}`);
  },
  deleteAlgorithm: function (id) {
    return axios.delete(`/api/algorithm/${id}`);
  },
  editAlgorithm: function (id) {
    axios.put(`/api/algorithm/${id}`);
  },
  

  login: function (userInfo) {
    return axios.post("/api/login", userInfo);
  },
  signup: function (userInfo) {
    return axios.post("/api/signup", userInfo);
  },
  postCode: function (input, mode) {
    return axios({
      method: "POST",
      url: "/api/code",
      data: { input, mode },
    });
  },
  addAlgorithm: function (algorithm) {
    return axios.post("/api/algorithm", algorithm);
  },
};

export default API;
