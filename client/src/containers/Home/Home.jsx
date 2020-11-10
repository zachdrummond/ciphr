import { Link } from "react-router-dom";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
// File Modules
import HomeSection from "../../components/HomeSection/HomeSection";
import API from "../../utils/API";
import { useState, useEffect } from "react";

// Styling for Specific Components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Home = () => {
  const classes = useStyles();

  const [allAlgorithms, setAllAlgorithms] = useState([]);

  useEffect(() => {
    getAllAlgorithms();
  }, []);

  const getAllAlgorithms = () => {
    API.getAllAlgorithms()
      .then((algorithms) => {
        console.log(algorithms);
        setAllAlgorithms(algorithms.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Welcome Message */}
          <Box p={3}>
            <Typography variant="h3" component="h3" align="center">
              Welcome Username!
            </Typography>
          </Box>
        </Grid>
        <HomeSection size={6} title="My Algorithms" algorithms={allAlgorithms}>
          <Box m={2}>
            <Link to={"/algorithms/new"}>
              <Fab color="primary" variant="extended">
                Add Algorithm
              </Fab>
            </Link>
          </Box>
        </HomeSection>
        <HomeSection size={6} title="Browse Algorithms" algorithms={allAlgorithms} />
      </Grid>
    </div>
  );
};

export default Home;
