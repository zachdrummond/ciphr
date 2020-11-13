import React from "react";

const SnackbarContext = React.createContext({});

export default SnackbarContext;

const [snackbarOpen, setSnackbarOpen] = React.useState(false);
