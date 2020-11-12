// React
import { useState, useEffect } from "react";
// Material UI
import { makeStyles, Grid } from "@material-ui/core";
// File Modules
import API from "../../utils/API";
import HomeSection from "../../components/HomeSection/HomeSection";

// Styling for Specific Components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const AllAlgorithms = () => {
  const classes = useStyles();

  const [allAlgorithms, setAllAlgorithms] = useState([]);

  useEffect(() => {
    getAllAlgorithms();
  }, [allAlgorithms]);

  const getAllAlgorithms = () => {
    API.getAllAlgorithms()
      .then((algorithms) => {
        setAllAlgorithms(algorithms.data);
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
          title="All Algorithms"
          algorithms={allAlgorithms}
        />
      </Grid>
    </div>
  );
};

export default AllAlgorithms;
