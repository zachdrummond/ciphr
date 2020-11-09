import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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
    marginBottom: "30px",
  },
}));

export default function AddAlgorithm() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (

    <Container maxWidth="md" >
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
                            id="outlined-multiline-flexible"
                            label="Challenge name"
                            multiline
                            rowsMax={4}
                            value={value}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </form>
                </Paper> 
            </Grid>

        </Grid>

     
    </Container>
 
  );
}