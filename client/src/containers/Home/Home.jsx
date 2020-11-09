import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import AlgorithmListItem from "../../components/AlgorithmListItem/AlgorithmListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  center: {
    textAlign: "center",
  },
  button: {
      marginTop: "10px"
  }
}));

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>AlgoMaster</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>My Algorithms</Paper>
          <Container className={classes.center}>
            <Button className={classes.button} variant="contained" color="primary" disableElevation>
              Add Algorithm
            </Button>
            <List
              component="nav"
              className={classes.root}
              aria-label="mailbox folders"
            >
              <Divider />
              <AlgorithmListItem title={"Is it a Palandrome?"} author={"Some Guy"} />
              <ListItem button divider>
                <ListItemText primary="Drafts" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Trash" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="Spam" />
              </ListItem>
              <Divider />
            </List>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Browse Algorithms</Paper>
          <Container>
            <List
              component="nav"
              className={classes.root}
              aria-label="mailbox folders"
            >
              <Divider />
              <AlgorithmListItem title={"Who is your daddy?"} author={"Shark Man"} />
              <ListItem button divider>
                <ListItemText primary="Drafts" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Trash" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="Spam" />
              </ListItem>
              <Divider />
            </List>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
