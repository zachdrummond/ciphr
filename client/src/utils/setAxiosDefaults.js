import axios from "axios";

// A function that sets the authorization header to the jwt argument
const setAxiosDefaults = (token) => {
  axios.defaults.headers["Authorization"] = token;
  console.log(axios.defaults.headers["Authorization"]);
};

export default setAxiosDefaults;
