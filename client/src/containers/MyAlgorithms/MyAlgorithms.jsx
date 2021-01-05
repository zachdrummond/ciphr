// React
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
// Material UI
import { makeStyles, Grid, Fab, Box, Typography } from "@material-ui/core";
// File Modules
import API from "../../utils/API";
import AuthContext from "../../context/AuthContext/AuthContext";
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

  const [myAlgorithms, setMyAlgorithms] = useState([]);

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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // passing down delete button
  const handleDelete = (id) => {
    API.deleteAlgorithm(id)
      .then((res) => {
        console.log(res);
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
        >
          <Box m={2}>
            <Link to={"/algorithms/new"} className={classes.fab}>
              <Fab color="primary" variant="extended">
                Add Algorithm
              </Fab>
            </Link>
          </Box>
        </HomeSection>
      </Grid>
    </div>
  );
};

export default MyAlgorithms;
