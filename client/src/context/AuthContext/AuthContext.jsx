import React from "react";

const AuthContext = React.createContext({
  jwt: "",
  setJwt: () => {},
  username: "",
  setUsername: () => {},
});

export default AuthContext;
