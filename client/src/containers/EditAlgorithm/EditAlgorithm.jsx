// React
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import {
  Button,
  Fade,
  Modal,
  Backdrop,
  Container,
  Grid,
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
import useTestCase from "../../utils/useTestCase";
import TestCase from "../../components/TestCase/TestCase";

const useStyles = makeStyles((theme) => ({
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3, 0),
      width: "100%",
    },
  },
  mastergrid: {
    margin: theme.spacing(8, 0),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(4),
    justify: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  titleBottom: {
    marginBottom: theme.spacing(4),
  },
}));

export default function EditAlgorithm() {
  const classes = useStyles();
  const { jwt } = useContext(AuthContext);
  const history = useHistory();

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
  const [open, setOpen] = React.useState(false);
  // modal functions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/home");
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

  const [algoInfo, setAlgoInfo] = useState({
    challengeName: "",
    challengeDescription: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    // handles input of either challenge name or description
    setAlgoInfo({ ...algoInfo, [name]: value });
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

    API.addAlgorithm({
      algorithm: {
        challengeName: algoInfo.challengeName,
        description: algoInfo.challengeDescription,
      },
      testCases: allUsedTests,
      userJwt: jwt,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="sm">
      <Grid container className={classes.mastergrid}>
        <Grid item xs={12}>
          <Typography
            className={classes.titleBottom}
            variant="h4"
            color="textPrimary"
            align="left"
          >
            Edit Algorithm
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

              <Typography variant="h6" color="textPrimary" align="left">
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
                return null; // IS THIS OKAY? THERE WAS A BUG THAT EXPECTED A RETURN
              })}

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
              <Button
                onClick={handleOpen}
                variant="contained"
                color="primary"
                type="submit"
              >
                Save
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modalPaper}>
            <h2 id="transition-modal-title">Algorithm Successfully Added!</h2>
            <p id="transition-modal-description">Click anywhere to continue.</p>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}
