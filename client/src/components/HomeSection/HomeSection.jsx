// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
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

const HomeSection = (props) => {

  const classes = useStyles();

  return (
    <Grid item xs={6}>
      {/* My Algorithms Section */}
      <Paper elevation={5} className={classes.paper}>
        {props.title}
      </Paper>
      <Container align="center">
        {props.children}
        <List
          component="nav"
          className={classes.root}
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
  );
};

export default HomeSection;
