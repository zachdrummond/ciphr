import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(8, 4),
  },
  autosize: {
    resize: "vertical",
    width: "100%",
  },
  column: {
    paddingRight: "60px",
  },
  paper: {
    padding: "30px",
  },
  titleBottom: {
    marginBottom: "30px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Challenge = () => {
  const classes = useStyles();
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.root}>
        <Typography
          className={classes.titleBottom}
          variant="h4"
          color="textPrimary"
          align="left"
        >
          Challenge: The Three Comma Club
        </Typography>
        <Grid item xs={12}>
          <Grid container>
            <Grid className={classes.column} item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography
                  className={classes.titleBottom}
                  mb={2}
                  variant="h5"
                  color="textPrimary"
                  align="left"
                >
                  Input
                </Typography>
                <textarea
                  className={classes.autosize}
                  name="textArea1"
                  rows="22"
                  cols="50"
                >
                  At w3schools.com you will learn how to make a website. They
                  offer free tutorials in all web development technologies.
                </textarea>
                <Typography
                  className={classes.titleBottom}
                  variant="h5"
                  color="textPrimary"
                  align="left"
                >
                  Output
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Language
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={code}
                      onChange={handleChange}
                      label="Language"
                    >
                      <MenuItem value="javascript">
                        <em>Node.js</em>
                      </MenuItem>
                      <MenuItem value="python3">Python3</MenuItem>
                      <MenuItem value="golang">Golang</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
                <textarea
                  className={classes.autosize}
                  name="textArea2"
                  rows="10"
                  cols="50"
                >
                  At w3schools.com you will learn how to make a website. They
                  offer free tutorials in all web development technologies.
                </textarea>
              </Paper>
            </Grid>

            <Grid item className={classes.column} xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography
                  className={classes.titleBottom}
                  variant="h5"
                  color="textPrimary"
                  align="left"
                >
                  Description
                </Typography>
                <Typography
                  className={classes.titleBottom}
                  variant="body1"
                  color="textPrimary"
                  align="left"
                >
                  This challenge is turning a number value into a string with
                  commas in the traditional place. For example, when given the
                  number 1000000, your function should return the answer
                  "1,000,000".
                </Typography>
                <Typography
                  className={classes.titleBottom}
                  variant="h5"
                  color="textPrimary"
                  align="left"
                >
                  Test Cases
                </Typography>
                <Typography
                  className={classes.titleBottom}
                  variant="body1"
                  color="textPrimary"
                  align="left"
                >
                  num1 = 12324; <br />
                  returns "12,324" <br />
                  <br />
                  num2 = 1827364672; <br />
                  returns "1,827,364,672" <br />
                  <br />
                  num3 = 234; <br />
                  returns "234"
                </Typography>
                <Box p={3} bgcolor="text.primary" color="background.paper">
                  <Typography
                    className={classes.titleBottom}
                    variant="body2"
                    // color="background.paper"
                    color="white"
                    align="left"
                  >
                    This challenge is turning a number value into a string with
                    commas in the traditional place. For example, when given the
                    number 1000000, your function should return the answer
                    "1,000,000".
                  </Typography>
                  <Button variant="contained" color="primary" disableElevation>
                    See answer
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Challenge;
