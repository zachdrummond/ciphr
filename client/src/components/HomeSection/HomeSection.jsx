// Material UI
import {
  Container,
  Grid,
  List,
  makeStyles,
  Typography,
  Paper,
} from "@material-ui/core";
// File Modules
import AlgorithmListItem from "../../components/AlgorithmListItem/AlgorithmListItem";
import HomeCard from "../HomeCard/HomeCard";
import CenteredTabs from "../CenteredTabs/CenteredTabs";
import Divider from "@material-ui/core/Divider";

// Styling for Specific Components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    marginBottom: "150px",
  },
  paper: {
    padding: theme.spacing(2, 0),
    margin: theme.spacing(0, 2),
    textAlign: "center",
    color: theme.palette.text.primary,
    fontSize: "1.5rem",
  },
  h5: {
    margin: theme.spacing(4, 2),
  },
}));

const HomeSection = ({
  size,
  title,
  children,
  algorithms,
  handleDelete,
  tabValue,
  search,
}) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid item xs={size}>
        <Paper className={classes.paper}>
          <CenteredTabs tabValue={tabValue} tab1={"All Algorithms"} tab2={"My Algorithms"}/>
          <Divider />
          <Typography
            variant="h5"
            color="textPrimary"
            align="center"
            className={classes.h5}
          >
            {title}
          </Typography>

          <Container align="center">
            {children}
            <List component="nav" className={classes.root}>
              {algorithms.length > 0 ? (
                algorithms.map((algorithm) => {
                  const {
                    _id,
                    challengeName,
                    userId,
                    stars,
                    hashtags,
                    description,
                  } = algorithm;
                  return (
                    <AlgorithmListItem
                      handleDelete={handleDelete}
                      key={_id}
                      title={challengeName}
                      author={userId?.username}
                      id={_id}
                      stars={stars}
                      hashtags={hashtags ? hashtags.join(" ") : ""}
                      description={description}
                    />
                  );
                })
              ) : (
                <HomeCard
                  text={
                    search
                      ? "No results found."
                      : "You haven't added anything yet. Maybe today is the day!"
                  }
                />
              )}
            </List>
          </Container>
        </Paper>
      </Grid>
    </Container>
  );
};

export default HomeSection;
