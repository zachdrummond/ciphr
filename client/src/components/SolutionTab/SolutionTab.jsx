import React from "react";
import PropTypes from "prop-types";
import { Box, Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "20px",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  description: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "12px",
    color: "secondary.main",
    padding: theme.spacing(2),
    whiteSpace: "pre-wrap",
  },
  code: {
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    whiteSpace: "pre-wrap",
  },
}));

const SolutionTab = ({ code, description, createdBy }) => {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <Grid container>
            <h3>{createdBy}</h3>
          </Grid>
          <Grid container>
            <Grid item>
              <Grid justify="space-between" container>
                <code className={classes.code}>{code}</code>
              </Grid>
            </Grid>
            <Grid item>
              <Grid justify="space-between" container>
                <Typography className={classes.description}>
                  {description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

SolutionTab.propTypes = {
  code: PropTypes.string,
  description: PropTypes.string,
  createdBy: PropTypes.string,
};

export default SolutionTab;
