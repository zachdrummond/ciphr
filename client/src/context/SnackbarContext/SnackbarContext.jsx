import React from "react";

const SnackbarContext = React.createContext({
  snackbarMessage: "",
  setSnackbarMessage: () => {},
  snackbarOpen: false,
  setSnackbarOpen: () => {},
});

export default SnackbarContext;