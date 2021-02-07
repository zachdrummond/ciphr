// React
import React from "react";
import PropTypes from "prop-types";

// Material UI
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Stars, StarRate } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// File imports
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

const SolutionTab = ({
  currentUser,
  code,
  description,
  createdBy,
  createdAt,
  lang,
  stars,
  id,
  toggledStar,
  starredSolutions,
  handleEdit,
  handleDelete,
}) => {
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

  let status = false;
  for (const star of starredSolutions) {
    if (star.id === id) {
      status = true;
    }
  }

  return (
    <div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="space-between">
            <h3>Solution by {createdBy}</h3>
            <FormControlLabel
              className={classes.star}
              control={
                <Checkbox
                  checked={status}
                  onChange={toggledStar}
                  icon={<StarRate />}
                  checkedIcon={<Stars />}
                  value={id}
                />
              }
              label={stars}
            />
            <p>{date}</p>
            {currentUser === createdBy ? (
              <Typography>
                <IconButton
                  value={id}
                  onClick={() => handleEdit(id, code, description, lang)}
                  edge="end"
                  aria-label="delete"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  value={id}
                  onClick={() => handleDelete(id)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid container>
            <Grid item>
              <Grid justify="space-between" container>
                <img className={classes.icon} src={langImage(lang)} alt="Images"></img>
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
  stars: PropTypes.number,
};

export default SolutionTab;
