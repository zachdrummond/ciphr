import React from "react";
import {Link} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
// import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AlgorithmListItem from "../../components/AlgorithmListItem/AlgorithmListItem";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

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
          <Box p={3}>
            <Typography variant="h3" component="h3" align="center">
              Welcome Username!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={5} className={classes.paper}>
            My Algorithms
          </Paper>
          <Container align="center">
            <Box m={2}>
              {/* <Button variant="contained" color="primary" disableElevation>
                Add Algorithm
              </Button> */}
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
