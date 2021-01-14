// React
import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
// Material UI
import {
  makeStyles,
  Grid,
  Fab,
  Box,
  Typography,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
// File Modules
import API from "../../utils/API";
import AuthContext from "../../context/AuthContext/AuthContext";
import SnackbarContext from "../../context/SnackbarContext/SnackbarContext";
import HomeSection from "../../components/HomeSection/HomeSection";

// Styling for Specific Components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    textDecoration: "none",
  },
}));

const MyAlgorithms = () => {
  const classes = useStyles();
  const { jwt, username } = useContext(AuthContext);
  const { snackbarMessage, snackbarOpen, setSnackbarOpen, setSnackbarMessage } = useContext(
    SnackbarContext
  );

  const [myAlgorithms, setMyAlgorithms] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  useEffect(() => {
    getMyAlgorithms();
  }, []);

  const getMyAlgorithms = () => {
    API.getMyAlgorithms(jwt)
      .then((algorithms) => {
        algorithms.data.sort(function (a, b) {
          return (
            b.stars - a.stars || new Date(b.createdAt) - new Date(a.createdAt)
          );
        });
        setMyAlgorithms(algorithms.data);
        setDeleted(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // passing down delete button
  const handleDelete = (id) => {
    API.deleteAlgorithm(id)
      .then((res) => {
        setSnackbarMessage("Algorithm Successfully Deleted!");
        setSnackbarOpen(true);
        setDeleted(true);
        getMyAlgorithms();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Welcome Message */}
          <Box p={8}>
            <Typography
              variant="h3"
              component="h3"
              align="center"
              style={{ wordWrap: "break-word" }}
            >
              Welcome {username}!
            </Typography>
          </Box>
        </Grid>
        <HomeSection
          tabValue={1}
          handleDelete={handleDelete}
          size={12}
          title={`${username}'s Algorithms`}
          algorithms={myAlgorithms}
          deleted={deleted}
        >
          <Box m={2}>
            <Link to={"/algorithms/new"} className={classes.fab}>
              <Fab color="primary" variant="extended">
                Add Algorithm
              </Fab>
            </Link>
          </Box>
        </HomeSection>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackbarMessage}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Grid>
    </div>
  );
};

export default MyAlgorithms;
