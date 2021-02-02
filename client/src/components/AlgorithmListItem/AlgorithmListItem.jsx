// React
import { Link } from "react-router-dom";
import React from "react";
// File imports

// Material UI
import {
  Box,
  ButtonBase,
  Chip,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Stars } from "@material-ui/icons";

// THIS IS BACK TO THE BEGINNING

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "20px",
    marginLeft: "5px",
    marginRight: "5px",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  noUnder: {
    textDecoration: "none",
  },
  star: {
    // color: theme.palette.text.secondary,
    marginRight: "5px",
  },
}));

const AlgorithmListItem = ({
  title,
  author,
  id,
  handleDelete,
  stars,
  hashtags,
  description,
}) => {
  const classes = useStyles();

  // cuts text of at 210 chars or slightly longer to finish out word
  const previewText = (text) => {
    let c = "";
    for (let i = 0; i < text.length; i++) {
      if (i <= 210) {
        c += text[i];
      } else if (i > 210 && text[i] !== " ") {
        c += text[i];
      } else if (i > 210 && text[i] === " ") {
        return (c += "...");
      }
    }
    return c;
  };

  return (
    <Link className={classes.noUnder} to={`/algorithms/${id}`}>
      <Box className={classes.root}>
        <Paper button elevation={5} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid justify="space-between" container>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <Stars className={classes.star} color="secondary" />
                  {stars}
                </ButtonBase>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{author}</Typography>
                {!author ? (
                  <Typography>
                    <IconButton
                      component={Link}
                      to={`/algorithms/edit/${id}`}
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
                      component={Link}
                      to={`/algorithms`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <Grid justify="center" item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h5">
                    {title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {previewText(description)}
                  </Typography>
                </Grid>
                <Grid item>
                  {hashtags
                    ? hashtags.split(" ").map((hashtag, index) => {
                        if (index < 3) {
                          return (
                            <Chip
                              label={hashtag}
                              key={index}
                              color="secondary"
                              size="medium"
                              className={classes.chip}
                            />
                          );
                        }
                      })
                    : ""}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Link>
  );
};

export default AlgorithmListItem;
