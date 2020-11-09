import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  mastergrid: {
    margin: theme.spacing(8, 4),
  }
}));

export default function AddAlgorithm() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (

    <Container maxWidth="lg" >
        <Grid container className={classes.mastergrid}>
            <form className={classes.root} noValidate autoComplete="off">
            <Typography
          className={classes.titleBottom}
          variant="h4"
          color="textPrimary"
          align="left"
        >
          Challenge: The Three Comma Club
        </Typography>

            <TextField
                id="outlined-multiline-flexible"
                label="Multiline"
                multiline
                rowsMax={4}
                value={value}
                onChange={handleChange}
                variant="outlined"
                />
    
            </form>
        </Grid>
     
    </Container>
 
  );
}