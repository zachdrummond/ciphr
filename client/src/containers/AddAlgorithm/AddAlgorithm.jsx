import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import TestCase from "../../components/TestCase/TestCase";

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

//   const [value, setValue] = React.useState('Controlled');

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

  const [algoInfo, setAlgoInfo] = useState({
    challengeName: "",
    challengeDescription: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    // handles input of either challenge name or description
    setAlgoInfo({...algoInfo, [name]: value} );
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
                <form className={classes.form} noValidate autoComplete="off">
                    <Typography
                        variant="h6"
                        color="textPrimary"
                        align="left"
                        >
                        Give your Algorithm a name
                    </Typography>
                    
                    <TextField
                        id="algo-name"
                        label="Challenge name"
                        multiline
                        rowsMax={4}
                        name="challengeName"
                        value={algoInfo.challengeName}
                        onChange={handleInput}
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
                        name="challengeDescription"
                        value={algoInfo.challengeDescription}
                        onChange={handleInput}
                        variant="outlined"
                        fullWidth
                        rows={4}
                    />

                    <TestCase />
       
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