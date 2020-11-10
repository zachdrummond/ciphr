import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";

const TestCase = ({testName, handleTestInput, handleTestOutput, testCaseIn, testCaseOut}) => {
    return (
        <div>
        <Typography
            variant="h6"
            color="textPrimary"
            align="left"
            >
            Add Input
        </Typography>
        <TextField
            id="test-input"
            label="Add Input"
            multiline
            name={testName}
            value={testCaseIn[testName]}
            onChange={handleTestInput}
            variant="outlined"
            fullWidth
        />
        <Typography
            variant="h6"
            color="textPrimary"
            align="left"
            >
            Add Output
        </Typography>
        <TextField
            id="test-output"
            label="Add Output"
            multiline
            name={testName}
            value={testCaseOut[testName]}
            onChange={handleTestOutput}
            variant="outlined"
            fullWidth
        />
    </div>
    )
}

export default TestCase
