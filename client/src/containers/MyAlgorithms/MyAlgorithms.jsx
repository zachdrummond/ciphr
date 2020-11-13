// React
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
// Material UI
import { makeStyles, Grid, Fab, Box } from "@material-ui/core";
// File Modules
import API from "../../utils/API";
import AuthContext from "../../context/AuthContext/AuthContext";
import HomeSection from "../../components/HomeSection/HomeSection";

// Styling for Specific Components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const MyAlgorithms = () => {
  const classes = useStyles();
  const { jwt, username } = useContext(AuthContext);

  const [myAlgorithms, setMyAlgorithms] = useState([]);

  useEffect(() => {
    getMyAlgorithms();
  }, [myAlgorithms]);

  const getMyAlgorithms = () => {
    API.getMyAlgorithms(jwt)
      .then((algorithms) => {
        setMyAlgorithms(algorithms.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <HomeSection
          size={12}
          title={`${username} Algorithms`}
          algorithms={myAlgorithms}
        >
          <Box m={2}>
            <Link to={"/algorithms/new"}>
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
