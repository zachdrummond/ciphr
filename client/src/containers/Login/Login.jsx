import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../utils/API";
import CredentialsForm from "../../components/CredentialsForm/CredentialsForm";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(./img/magic-macbook.jpg)",
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  // Using AuthContextAPI to get the setJwt function
  const { setJwt } = useContext(AuthContext);

  // hook configures username/password state
  // to find state in dev tools 'Components' look under 'SignInSide'
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    // handles input of either username or password
    setUserInfo({ ...userInfo, [name]: value });
  };

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // username/password posted to back end
    // see API.js in utils for more info
    
    API.postUserInfo(userInfo)
      .then((response) => {
        
        // Setting the AuthContextAPI jwt to the new jwt received from the backend
        setJwt(response.data.data);
        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <CredentialsForm
            {...userInfo}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            classes={classes}
            type={"Sign in"}
            link={"/signup"}
            linkText={"New to Ciphr? Sign Up Here!"}
          />
        </div>
      </Grid>
    </Grid>
  );
}
