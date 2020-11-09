import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3,0),
      width: "100%",
    },
  },
  mastergrid: {
    margin: theme.spacing(8, 0),
  },
  paper: {
    padding: theme.spacing(4),  
    justify: "center",
  },
  titleBottom: {
    marginBottom: theme.spacing(4), 
  },
}));

export default function AddAlgorithm() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (

    <Container maxWidth="sm" >
        <Grid container className={classes.mastergrid}>
            
            <Grid item xs={12}>
                <Typography
                    className={classes.titleBottom}
                    variant="h4"
                    color="textPrimary"
                    align="left"
                    >
                Add an Algorithm
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography
                        variant="h6"
                        color="textPrimary"
                        align="left"
                        >
                        Give your Algorithm a name
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        id="algo-name"
                        label="Challenge name"
                        multiline
                        rowsMax={4}
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
                        Tell us about your Algorithm
                    </Typography>
                   
                    <TextField
                        id="algo-description"
                        label="Challenge Description"
                        multiline
                        rowsMax={4}
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
                        Describe any test cases
                    </Typography>
                    
                    <TextField
                        id="algo-test-cases"
                        label="Test Cases"
                        multiline
                        rowsMax={4}
                        value={value}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                    <Button variant="contained" color="primary">
                        Save
                    </Button>
                    </form>
                 
                </Paper> 
            </Grid>

        </Grid>

     
    </Container>
 
  );
}