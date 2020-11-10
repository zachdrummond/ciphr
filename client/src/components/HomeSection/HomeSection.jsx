// Material UI
import { makeStyles, Paper, Grid, List, Container } from "@material-ui/core";
// File Modules
import AlgorithmListItem from "../../components/AlgorithmListItem/AlgorithmListItem";
import HomeCard from "../HomeCard/HomeCard";

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

const HomeSection = ({ size, title, children, algorithms }) => {
  const classes = useStyles();

  return (
    <Grid item xs={size}>
      <Paper elevation={5} className={classes.paper}>
        {title}
      </Paper>
      <Container align="center">
        {children}
        <List component="nav" className={classes.root}>
          {algorithms.length > 0 ? algorithms.map((algorithm) => {
            const { _id, challengeName, description } = algorithm;
            return (
              <AlgorithmListItem
                key={_id}
                title={challengeName}
                author={description}
              />
            );
          }) : <HomeCard/>}
        </List>
      </Container>
    </Grid>
  );
};

export default HomeSection;
