// React
import { useState, useContext } from "react";
// Material UI
import {
  Button,
  Container,
  Grid,
  Box,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
// File Modules
import API from "../../utils/API";
import AuthContext from "../../context/AuthContext/AuthContext";
import ModalComponent from "../../components/Modal/ModalComponent";
import TestCase from "../../components/TestCase/TestCase";
import useTestCase from "../../utils/useTestCase";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: "150px",
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3, 0),
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
    marginBottom: theme.spacing(8),
  },
  buttonArea: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

export default function AddAlgorithm() {
  const classes = useStyles();
  const { jwt } = useContext(AuthContext);

  const [algoInfo, setAlgoInfo] = useState({
    challengeName: "",
    challengeDescription: "",
    hashtags: "",
  });

  // custom hook imported from useTestCase.js
  // instance for each test case
  const testOne = useTestCase();
  const testTwo = useTestCase();
  const testThree = useTestCase();
  const testFour = useTestCase();
  const allTests = [testOne, testTwo, testThree, testFour];

  // testCount keeps track of how many test cases there are
  const [testCount, setTestCount] = useState(0);
  // modal state
  const [open, setOpen] = useState(false);

  // form error state
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [descriptionError, setDescriptionError] = useState(false);
  const [hashtagError, setHashtagError] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    // handles input of either challenge name or description
    setAlgoInfo({ ...algoInfo, [name]: value });
    setError(false);
    setDescriptionError(false);
    setHashtagError(false);
  };

  // modal functions
  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleSaveAlgo = (e) => {
    e.preventDefault();
    // filters out empty hooks and formats for back end db
    const allUsedTests = [];
    for (let i = 0; i < allTests.length; i++) {
      if (i < testCount) {
        allUsedTests.push(allTests[i].test);
      }
    }

    // Convert the hashtags to an array
    const hashtagArray = algoInfo.hashtags.match(/#\w+/g);

    API.addAlgorithm({
      algorithm: {
        challengeName: algoInfo.challengeName,
        description: algoInfo.challengeDescription,
        hashtags: hashtagArray,
      },
      testCases: allUsedTests,
      userJwt: jwt,
    })
      .then((response) => {
        handleModalOpen();
      })
      .catch((err) => {
        if (!algoInfo.challengeName) {
          setError({
            error: true,
            message: "Must include a challenge name.",
          });
        }
        if (!algoInfo.hashtags) {
          setHashtagError(true);
        } else if (
          algoInfo.challengeName &&
          algoInfo.challengeDescription &&
          algoInfo.hashtags[0].includes("#")
        ) {
          setError({
            error: true,
            message: "Challenge name already exists.",
          });
        }
        if (!algoInfo.challengeDescription) {
          setDescriptionError(true);
        }
        if (!algoInfo.hashtags) {
          setHashtagError(true);
        } else if (!algoInfo.hashtags[0].includes("#")) {
          setHashtagError(true);
        }
        console.log(err);
      });
  };

  // each time the button is clicked the count is incremented
  const handleTestButton = () => {
    if (testCount < 4) {
      const newCount = testCount + 1;
      setTestCount(newCount);
    }
  };

  // decrements testCount value to remove test cases
  const handleSeeLess = () => {
    const newCount = testCount - 1;
    setTestCount(newCount);
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid container className={classes.mastergrid}>
        <Grid item xs={12}>
          <Typography
            className={classes.titleBottom}
            variant="h4"
            color="textPrimary"
            align="center"
          >
            Add an Algorithm
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSaveAlgo}
            >
              <Typography variant="h6" color="textPrimary" align="left">
                Give your Algorithm a Name
              </Typography>

              <TextField
                id="algo-name"
                label="Challenge Name"
                multiline
                required
                autoFocus
                rowsMax={4}
                name="challengeName"
                value={algoInfo.challengeName}
                onChange={handleInput}
                variant="outlined"
                fullWidth
                error={error.error}
                helperText={error.error ? error.message : ""}
              />
              <Typography
                variant="h6"
                color="textPrimary"
                align="left"
                display="inline"
              >
                Tell us about your Algorithm
              </Typography>

              <TextField
                id="algo-description"
                label="Challenge Description"
                multiline
                required
                rowsMax={6}
                name="challengeDescription"
                value={algoInfo.challengeDescription}
                onChange={handleInput}
                variant="outlined"
                fullWidth
                rows={6}
                error={descriptionError}
                helperText={
                  descriptionError
                    ? "Must include a challenge description."
                    : ""
                }
              />

              <Typography
                variant="h6"
                color="textPrimary"
                align="left"
                display="inline"
              >
                Add Hashtags!
              </Typography>

              <TextField
                id="algo-description"
                label="#algorithm"
                multiline
                rowsMax={4}
                name="hashtags"
                value={algoInfo.hashtags}
                onChange={handleInput}
                variant="outlined"
                fullWidth
                rows={4}
                error={hashtagError}
                helperText={
                  hashtagError
                    ? "Must include at least one hashtag. (# must precede value. i.e. #javascript)"
                    : ""
                }
              />

              {/* map over array of test case hooks */}
              {allTests.map((test, index) => {
                if (index < testCount) {
                  return (
                    <TestCase
                      {...test}
                      key={`Test Case ${index + 1}`}
                      header={`Test Case ${index + 1}`}
                      setCase={test.setTestCase}
                    />
                  );
                }
                return "";
              })}

              <Box className={classes.buttonArea}>
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    onClick={handleTestButton}
                  >
                    Add Test Case
                  </Button>
                  {/* only shows remove test case button if there is at least one */}
                  {testCount > 0 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      startIcon={<RemoveIcon />}
                      onClick={handleSeeLess}
                    >
                      Remove Test Case
                    </Button>
                  ) : (
                    <></>
                  )}
                </Box>
                <Box>
                  <Button
                    // onClick={handleModalOpen}
                    variant="contained"
                    color="primary"
                    type="submit"
                    align="right"
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        text="Algorithm Successfully Added!"
        url="/home"
      />
    </Container>
  );
}
