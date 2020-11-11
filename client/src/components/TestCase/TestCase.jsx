// React
import React from "react";
// Material UI
import { TextField, Typography } from "@material-ui/core";

const TestCase = ({ setCase, input, output, header }) => {
  console.log(input)
  return (
    <div>
      <h3>{header}</h3>
      <Typography variant="h6" color="textPrimary" align="left">
        Add Input
      </Typography>
      <TextField
        id="test-input"
        label="Add Input"
        multiline
        name="input"
        value={input}
        onChange={setCase}
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
        name="output"
        value={output}
        onChange={setCase}
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

export default TestCase;
