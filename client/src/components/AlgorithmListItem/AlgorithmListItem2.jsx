// React
import { Link } from "react-router-dom";
// File imports

// Material UI
import { Box, Chip, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { StarRate } from "@material-ui/icons";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

// THIS IS BACK TO THE BEGINNING

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "20px",
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
    color: theme.palette.text.secondary,
  }
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
        return c += "...";
      }
    }
    return c;
  }

  return (
    <Link className={classes.noUnder} to={`/algorithms/${id}`}>
      <Box className={classes.root}>
        <Paper button elevation={3} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid justify="space-between" container>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <StarRate className={classes.star}/>
                  {stars}
                </ButtonBase>
              </Grid>
              <Grid  item>
                <Typography
                  variant="subtitle1"
                >
                  {author}
                </Typography>
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
                    ? hashtags
                        .split(" ")
                        .map((hashtag, index) => {
                          if (index < 3) {return (
                          <Chip
                            label={hashtag}
                            key={index}
                            color="secondary"
                            size="medium"
                            className={classes.chip}
                          />
                        )}})
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
