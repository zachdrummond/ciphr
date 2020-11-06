import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(8, 4),
  },
}));

const Challenge = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Typography variant="h4" color="textSecondary" align="left">
        Challenge: The Three Comma Club
      </Typography>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            Column 1
          </Grid>
          <Grid item xs={6}>
            Column 2
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Challenge;