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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import API from "../../utils/API";

const useStyles = makeStyles((theme) => ({
  mastergrid: {
    margin: theme.spacing(8, 0),
  },
  autosize: {
    resize: "vertical",
    width: "100%",
  },
  column: {
    margin: theme.spacing(1, 0),
  },
  paper: {
    padding: theme.spacing(4),  
    margin: theme.spacing(1, 1),
  },
  titleBottom: {
    marginBottom: theme.spacing(4), 
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    float: "right",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  runButton: {
    margin: 20,
    width: 100,
  }
}));

const Challenge = () => {
  const classes = useStyles();
  // sets the code input in first text area and language in dropdown select as state.
  // find in dev tools components under 'Challenge'
  const [input, setInput] = useState({
    code: "",
    language: "",
  });
  const [output, setOutput] = useState("")

  // changes either code or language depending on name attribute
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();

    // stops function if no code is entered
    if (input.code.length === 0) {
      alert("No code to run!")
      return;
    }
    // post code/input to server (codeController.js) where third party api call is made
    API.postCode(input).then(({data}) => {
      // if nothing is logged to console alert pops up
      if (data.out.length === 0 && data.err.length === 0) {
        alert("Remember to call functions or log/print results to console!")
      // if output is null error is logged to console and vice versa
      } else if (data.out.length === 0) {
        setOutput(data.err);
      } else if (data.err.length === 0) {
        setOutput(data.out);
      }
    }).catch(err => {
      console.log(err);
    })

  };

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.mastergrid}>
      <Grid item xs={12}>
        <Typography
          className={classes.titleBottom}
          variant="h4"
          color="textPrimary"
          align="left"
        >
          Challenge: The Three Comma Club
        </Typography>
        </Grid>
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
                  name="code"
                  rows="22"
                  cols="50"
                  value={input.code}
                  onChange={handleInputChange}
                >
                  Input your code here!
                </textarea>
                <Typography
                  className={classes.titleBottom}
                  variant="h5"
                  color="textPrimary"
                  align="left"
                >
                  Output
                  <Button
                    onClick={handleCodeSubmit}
                    variant="contained"
                    color="primary"
                    className={classes.runButton}
                  >
                    Run
                  </Button>
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
                      value={input.language}
                      onChange={handleInputChange}
                      label="Language"
                      name="language"
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
                  name="output"
                  rows="10"
                  cols="50"
                  defaultValue={output}
                >
                  
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
