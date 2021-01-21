import React from "react";
import PropTypes from "prop-types";
import { Box, Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Java from "../../images/java.svg";
import Node from "../../images/node.svg";
import Python from "../../images/python.svg";
import R from "../../images/r.svg";
import CSharp from "../../images/csharp.svg";
import CPP from "../../images/cpp.svg";
import C from "../../images/c.svg";
import Go from "../../images/go.svg";
import Ruby from "../../images/ruby.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "20px",
  },
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(1, 1),
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
  icon: {
    margin: "20px",
  },
  date: {
    float: "right",
  },
}));

const SolutionTab = ({ code, description, createdBy, createdAt, lang }) => {
  const classes = useStyles();

  const langImage = (langString) => {
    switch (langString) {
      case "java":
        return Java;
      case "python3":
        return Python;
      case "r":
        return R;
      case "go":
        return Go;
      case "ruby":
        return Ruby;
      case "csharp":
        return CSharp;
      case "cpp":
        return CPP;
      case "c":
        return C;
      default:
        return Node;
    }
  };

  const date = new Date(createdAt).toDateString().slice(4);

  return (
    <div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="space-between">
            <h3>Solution by {createdBy}</h3>
            <p>{date}</p>
          </Grid>
          <Grid container>
            <Grid item>
              <Grid justify="space-between" container>
                <img className={classes.icon} src={langImage(lang)}></img>
              </Grid>
            </Grid>
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
  createdAt: PropTypes.string,
  lang: PropTypes.string,
};

export default SolutionTab;
