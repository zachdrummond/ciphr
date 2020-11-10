import axios from "axios";

const API = {
  getAllAlgorithms: function () {
    return axios.get("/api/algorithm");
  },
  //   getAlgorithm: function () {
  //     return axios.get("/api/algorithm/:id");
  //   },
  getMyAlgorithms: function (jwt) {
    return axios.get(`/api/algorithm/user/${jwt}`);

  },

  postUserInfo: function (data) {
    return axios({
      method: "POST",
      url: "/api/login",
      data: data,
    });
  },
  postNewUserInfo: function (data) {
    return axios({
      method: "POST",
      url: "/api/signup",
      data: data,
    });
  },
  postCode: function (input, mode) {
    return axios({
      method: "POST",
      url: "/api/code",
      data: { input, mode },
    });
  },
  postAlgorithm: function (data) {
    return axios({
      method: "POST",
      url: "/api/algorithm",
      data: data,
    });
  },
};

export default API;
