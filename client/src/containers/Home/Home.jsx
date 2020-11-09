import React from "react";
import { Link } from "react-router-dom";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
// File Modules
import AlgorithmListItem from "../../components/AlgorithmListItem/AlgorithmListItem";

// Styling for Specific Components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    fontSize: "1.5rem",
  },
}));

const Home = () => {
  const classes = useStyles();

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
        <Grid item xs={6}>
          {/* My Algorithms Section */}
          <Paper elevation={5} className={classes.paper}>
            My Algorithms
          </Paper>
          <Container align="center">
            <Box m={2}>
              <Link to={"/algorithms/new"}>
                <Fab color="primary" variant="extended">
                  Add Algorithm
                </Fab>
              </Link>
            </Box>
            <List
              component="nav"
              className={classes.root}
              aria-label="mailbox folders"
            >
              <Divider />
              <AlgorithmListItem
                title={"Is it a Palandrome?"}
                author={"Some Guy"}
              />
              <AlgorithmListItem
                title={"Reverse the array?"}
                author={"Tommy Boy"}
              />
            </List>
          </Container>
        </Grid>
        <Grid item xs={6}>
          {/* Browse Algorithms Section */}
          <Paper elevation={5} className={classes.paper}>
            Browse Algorithms
          </Paper>
          <Container>
            <List
              component="nav"
              className={classes.root}
              aria-label="mailbox folders"
            >
              <Divider />
              <AlgorithmListItem
                title={"Who is your daddy?"}
                author={"Shark Man"}
              />
              <AlgorithmListItem title={"Egg drop"} author={"Egg Man"} />
            </List>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
