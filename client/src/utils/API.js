import axios from "axios";

export default {
    postUserInfo: function (data) {
        return axios({
            method: "POST",
            url: "/api/login",
            data: data
        })
    }
}