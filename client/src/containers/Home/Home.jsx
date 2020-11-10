import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// Material UI
import { makeStyles, Grid, Fab, Box, Typography } from "@material-ui/core";
// File Modules
import HomeSection from "../../components/HomeSection/HomeSection";
import API from "../../utils/API";

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
  const handleClick = (e)=>{
    console.log(e);
  }

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
        <HomeSection size={6} title="My Algorithms" handleClick={handleClick} algorithms={allAlgorithms}>
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
