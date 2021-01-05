// Material UI
import { TextField, Typography } from "@material-ui/core";

const TestCase = ({ setCase, input, output, header }) => {
  return (
    <div>
      <Typography variant="h6" color="textPrimary" align="left">
        {header}
      </Typography>
      {/* <h3>{header}</h3> */}
      {/* <Typography variant="h7" color="textPrimary" align="left">
        Input to be Tested
      </Typography> */}
      <TextField
        id="test-input"
        label="Input to be Tested"
        multiline
        name="input"
        value={input}
        onChange={setCase}
        variant="outlined"
        fullWidth
      />
      {/* <Typography variant="h7" color="textPrimary" align="left">
        Output Expected
      </Typography> */}
      <TextField
        id="test-output"
        label="Expected Output "
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
