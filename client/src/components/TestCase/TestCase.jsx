import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

const TestCase = ({ test, setInput, setOutput, input, output }) => {
  return (
    <div>
      <Typography variant="h6" color="textPrimary" align="left">
        Add Input
      </Typography>
      <TextField
        id="test-input"
        label="Add Input"
        multiline
        name={test}
        value={input[test]}
        onChange={setInput}
        variant="outlined"
        fullWidth
      />
      <Typography variant="h6" color="textPrimary" align="left">
        Add Output
      </Typography>
      <TextField
        id="test-output"
        label="Add Output"
        multiline
        name={test}
        value={output[test]}
        onChange={setOutput}
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

export default TestCase;
