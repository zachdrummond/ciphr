// React
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import {
  Avatar,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Box,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// Framer Motion
import { motion } from "framer-motion";
// File Modules
import API from "../../utils/API";
import AuthContext from "../../context/AuthContext/AuthContext";
import CredentialsForm from "../../components/CredentialsForm/CredentialsForm";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  about: {
    display: "flex",
    flexDirection: "column",
    backgroundImage: "url(./img/code-bg.jpg)",
    alignItems: "center",
    justifyContent: "center",
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
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
  const history = useHistory();

  // Using AuthContextAPI to get the setJwt function
  const { setJwt, setUsername } = useContext(AuthContext);

  // hook configures username/password state
  // to find state in dev tools 'Components' look under 'SignInSide'
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    // handles input of either username or password
    setUserInfo({ ...userInfo, [name]: value });
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // username/password posted to back end
    // see API.js in utils for more info

    API.login(userInfo)
      .then((response) => {
        // Setting the AuthContextAPI jwt to the new jwt received from the backend
        setJwt(response.data.data);
        setUsername(userInfo.username);
        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  useEffect(() => {
    setJwt("");
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={0} sm={6} md={8} className={classes.about}>
        <Box my={8}>
          <motion.svg
            width="200"
            height="200"
            viewBox="0 0 193 189"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            align="center"
            // animate={{ y: [0, 20, 0] }}
            // transition={{
            //   duration: 4,
            //   loop: Infinity,
            // }}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M96.5493 59.5C77.1074 59.5 61.5 75.0217 61.5 93.9807C61.5 112.94 77.1074 128.461 96.5493 128.461C110.207 128.461 122.009 120.785 127.797 109.617C129.449 106.43 133.372 105.185 136.559 106.837C139.746 108.489 140.991 112.412 139.339 115.599C131.373 130.97 115.184 141.461 96.5493 141.461C70.0971 141.461 48.5 120.288 48.5 93.9807C48.5 67.6737 70.0971 46.5 96.5493 46.5C115.184 46.5 131.373 56.9913 139.339 72.3621C140.991 75.5493 139.746 79.4722 136.559 81.1241C133.372 82.776 129.449 81.5313 127.797 78.3441C122.009 67.1768 110.207 59.5 96.5493 59.5Z"
              fill="#8000ff"
            />
            <motion.path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.6751 94.4855C13.6751 134.068 41.0544 167.192 77.7463 175.77C81.2419 176.587 83.4131 180.084 82.5959 183.579C81.7786 187.075 78.2824 189.246 74.7868 188.429C32.2966 178.495 0.67511 140.192 0.67511 94.4855C0.67511 48.9873 32.0086 10.8262 74.205 0.68013C77.6954 -0.159134 81.2053 1.99002 82.0445 5.48039C82.8838 8.97075 80.7346 12.4806 77.2443 13.3199C40.8046 22.0818 13.6751 55.084 13.6751 94.4855ZM110.579 183.579C109.762 180.084 111.933 176.587 115.429 175.77C152.121 167.192 179.5 134.068 179.5 94.4855C179.5 55.084 152.371 22.0818 115.931 13.3199C112.44 12.4806 110.291 8.97075 111.131 5.48039C111.97 1.99002 115.48 -0.159134 118.97 0.68013C161.166 10.8262 192.5 48.9873 192.5 94.4855C192.5 140.192 160.879 178.495 118.388 188.429C114.893 189.246 111.397 187.075 110.579 183.579Z"
              fill="#8000ff"
              // initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 6,
                loop: Infinity,
                // type: "tween",
                ease: "linear",
              }}
            />
          </motion.svg>
        </Box>

        <Box mb={4}>
          <Typography variant="h4" align="center">
            ciphr = a place to share algorithms
          </Typography>
        </Box>

        <Box mb={8}>
          <Typography variant="h6" align="center">
            Create a new account or sign-in to start sharing
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <CredentialsForm
            {...userInfo}
            error={error}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            classes={classes}
            type={"Sign In"}
            link={"/signup"}
            linkText={"New to Ciphr? Sign up here!"}
          />
        </div>
      </Grid>
    </Grid>
  );
}
