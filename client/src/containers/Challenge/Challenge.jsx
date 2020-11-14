// React
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// Material UI
import {
  Box,
  Button,
  Container,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Stars, StarsOutlined } from "@material-ui/icons";
// File Modules
import API from "../../utils/API";
// Code Mirror
import CodeMirror from "react-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/go/go";
import "codemirror/mode/clike/clike";
import "codemirror/mode/r/r";
import "codemirror/mode/shell/shell";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/sql/sql";
// import all the themes from codemirror/theme/...
import "codemirror/theme/material-darker.css";
// Context API
import AuthContext from "../../context/AuthContext/AuthContext";

const useStyles = makeStyles((theme) => ({
  mastergrid: {
    margin: theme.spacing(8, 0),
  },
  autosize: {
    resize: "vertical",
    width: "100%",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  column: {
    margin: theme.spacing(1, 0),
  },
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(1, 1),
  },
  titleBottom: {
    marginBottom: theme.spacing(3),
    width: "100%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    float: "right",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  runButton: {
    margin: 20,
    width: 100,
    height: 40,
  },
}));

const Challenge = ({ theme }) => {
  const classes = useStyles();
  const { algorithmId } = useParams();

  const { username } = useContext(AuthContext);

  // const [code, setCode] = useState("// Code")
  const [options, setOptions] = useState({
    mode: "javascript",
    lineNumbers: true,
    theme: "",
  });
  // sets the code input in first text area and language in dropdown select as state.
  // find in dev tools components under 'Challenge'
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  // state of code compiler after submit
  const [running, setRunning] = useState(false);
  // star status
  const [star, setStar] = useState(false);

  useEffect(() => {
    !theme
      ? setOptions({ ...options, theme: "material-darker" })
      : setOptions({ ...options, theme: "default" });
  }, [theme]);

  useEffect(() => {
    // make API call to get algorithm by id
    API.getAlgorithm(algorithmId)
      .then((response) => {
        setAlgorithm(response.data);
        // gets status of star (ie. liked/disliked)
        API.getStar(algorithmId, username).then((starRes) => {
          setStar(starRes.data.data);
        }).catch(err => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // toggles star icon off/on
  const toggleStar = () => {
    setStar(!star);
    API.star(algorithmId, star, username)
      .then((response) => {
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // changes the value of the input hook
  const handleInputChange = (e) => {
    setInput(e);
  };

  const handleOptionsChange = (e) => {
    const language = e.target.value;

    setOptions({ ...options, mode: language });
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    // stops function if no code is entered
    if (input.length === 0) {
      alert("No code to run!");
      return;
    } else {
      // circular progress on button engadged
      setRunning(true);
    }
    // post code/input to server (codeController.js) where third party api call is made
    API.postCode(input, options.mode)
      .then(({ data }) => {
        // if nothing is logged to console alert pops up
        if (data.out.length === 0 && data.err.length === 0) {
          alert("Remember to call functions or log/print results to console!");
          // if output is null error is logged to console and vice versa
        } else if (data.out.length === 0) {
          setOutput(data.err);
        } else if (data.err.length === 0) {
          setOutput(data.out);
        }
        // circular progress stopped
        setRunning(false);
      })
      .catch((err) => {
        setRunning(false);
        console.log(err);
      });
  };

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.mastergrid}>
        <Grid item xs={12}>
          <Typography
            className={classes.titleBottom}
            variant="h4"
            color="textPrimary"
            align="center"
          >
            {algorithm.challengeName}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={star}
                onChange={toggleStar}
                icon={<StarsOutlined />}
                checkedIcon={<Stars />}
                name="checkedH"
              />
            }
            label="Star"
          />
          <Typography
            className={classes.titleBottom}
            variant="h6"
            color="textPrimary"
            align="center"
          >
            Added by: {algorithm.user?.username}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid className={classes.column} item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography
                  className={classes.titleBottom}
                  mb={2}
                  variant="h5"
                  color="textPrimary"
                  align="left"
                >
                  Input
                </Typography>
                <CodeMirror
                  name="code"
                  value={input}
                  onChange={handleInputChange}
                  options={options}
                >
                  Input your code here!
                </CodeMirror>
                <Typography
                  className={classes.titleBottom}
                  variant="h5"
                  color="textPrimary"
                  align="left"
                >
                  Output
                  <Button
                    onClick={handleCodeSubmit}
                    variant="contained"
                    color="primary"
                    className={classes.runButton}
                  >
                    {/* Upon code submit 'running' is set to True, upon API response set to false */}
                    {running ? (
                      <CircularProgress size={30} color="secondary" />
                    ) : (
                      <p>Run</p>
                    )}
                  </Button>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Language
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={options.mode}
                      onChange={handleOptionsChange}
                      label="Language"
                      name="language"
                    >
                      <MenuItem value="javascript">Node.js</MenuItem>
                      <MenuItem value="python">Python3</MenuItem>
                      <MenuItem value="go">Golang</MenuItem>
                      <MenuItem value="java">Java</MenuItem>
                      <MenuItem value="r">R</MenuItem>
                      <MenuItem value="clike">C#</MenuItem>
                      <MenuItem value="ruby">Ruby</MenuItem>
                      <MenuItem value="sql">SQL</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
                <textarea
                  className={classes.autosize}
                  name="output"
                  rows="10"
                  cols="50"
                  defaultValue={output}
                ></textarea>
              </Paper>
            </Grid>

            <Grid item className={classes.column} xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography
                  className={classes.titleBottom}
                  variant="h5"
                  color="textPrimary"
                  align="left"
                >
                  Description
                </Typography>
                <Typography
                  className={classes.titleBottom}
                  variant="body1"
                  multiline="true"
                  color="textPrimary"
                  align="left"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {/* Regex replaces breaks with line breaks */}
                  {algorithm
                    ? algorithm.description.replace(/(<br>)/g, "\n")
                    : ""}
                </Typography>
                {algorithm.testCases > 0 ? (
                  <Typography
                    className={classes.titleBottom}
                    variant="h5"
                    color="textPrimary"
                    align="left"
                  >
                    Test Cases
                  </Typography>
                ) : (
                  ""
                )}
                {/* populate all test cases if they exist */}
                {algorithm
                  ? algorithm.testCases.map((algo, index) => (
                      <ul key={index}>
                        <li>Input: {algo.input}</li>
                        <li>Result: {algo.output}</li>
                        <br />
                      </ul>
                    ))
                  : ""}
                {algorithm.hashtags ? (
                  <Typography
                    className={classes.titleBottom}
                    variant="h5"
                    color="textPrimary"
                    align="left"
                  >
                    Hashtags
                  </Typography>
                ) : (
                  ""
                )}
                {algorithm.hashtags
                  ? algorithm.hashtags.map((hashtag) => (
                      <Chip
                        label={hashtag}
                        color="secondary"
                        size="small"
                        className={classes.chip}
                      />
                    ))
                  : ""}

                <Box
                  p={3}
                  mt={1}
                  bgcolor="text.primary"
                  color="background.paper"
                >
                  <Typography
                    className={classes.titleBottom}
                    variant="body2"
                    // color="background.paper"
                    // color="white"
                    align="left"
                  >
                    {algorithm.description}
                  </Typography>
                  <Button variant="contained" color="primary" disableElevation>
                    See answer
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Challenge;
