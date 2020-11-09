import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";

const TestCase = () => {
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
      setValue(event.target.value);
    };
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
            id="algo-name"
            label="Add Input"
            multiline
            value={value}
            onChange={handleChange}
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
            id="algo-name"
            label="Add Output"
            multiline
            value={value}
            onChange={handleChange}
            variant="outlined"
            fullWidth
        />
    </div>
    )
}

export default TestCase
