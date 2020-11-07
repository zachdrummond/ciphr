import axios from "axios";

const API = {
    postUserInfo: function (data) {
        return axios({
            method: "POST",
            url: "/api/login",
            data: data
        })
    },
    postCode: function (data) {
        return axios({
            method: "POST",
            url: "/api/code",
            data: data,
        })
    }
}

export default API;