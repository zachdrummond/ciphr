// React imports
import React from "react";

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
    maxHeight: 500,
    overflow: "auto",
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

const HomeSection = ({ size, title, children, algorithms, handleDelete, tabValue }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Grid item xs={size}>
        <Paper className={classes.paper}>
          <CenteredTabs tabValue={tabValue} />
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
                  const { _id, challengeName, user } = algorithm;
                  return (
                    <AlgorithmListItem
                      handleDelete={handleDelete}
                      key={_id}
                      title={challengeName}
                      author={user?.username}
                      id={_id}
                    />
                  );
                })
              ) : (
                <HomeCard />
              )}
            </List>
          </Container>
        </Paper>
      </Grid>
    </Container>
  );
};

export default HomeSection;
