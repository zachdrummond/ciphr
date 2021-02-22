import axios from "axios";

// A function that sets the authorization header to the jwt argument
export const setAxiosDefaults = (token) => {
  axios.defaults.headers["Authorization"] = token;
};

// sets anti-Csrf token with every axios request
export const setAxiosCsrf = (csrf) => {
  axios.defaults.headers.post['X-CSRF-Token'] = csrf;
};
