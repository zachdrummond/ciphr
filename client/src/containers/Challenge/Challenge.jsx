// React
import { useState, useEffect, useContext, useRef } from "react";
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
  List,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";
import { Stars, StarRate, Code } from "@material-ui/icons";
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
    width: "100%",
  },
  formControl: {
    marginTop: theme.spacing(2),
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
  star: {},
  codeMirror: {
    fontSize: 14,
  },
  infobox: {
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    display: "flex",
  },
  colorbox: {
    width: "3px",
  },
  description: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "16px",
    color: "secondary.main",
    padding: theme.spacing(2),
  },
  list: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(3),
    marginRight: theme.spacing(0),
  },
  listItem: {
    listStyle: "none",
    fontSize: 17,
    paddingTop: 25,
  },
  instructions: {
    fontSize: 12,
  },
}));

const Challenge = ({ theme }) => {
  const classes = useStyles();
  const { algorithmId } = useParams();
  const { username } = useContext(AuthContext);
  const codeOutput = useRef();

  // code mirror editor settings
  const [options, setOptions] = useState({
    mode: "javascript",
    lineNumbers: true,
    theme: "",
    autofocus: true,
  });
  // sets the code input in first text area and language in dropdown select as state.
  // find in dev tools components under 'Challenge'
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  // algorithm info is set on page load
  const [algorithm, setAlgorithm] = useState({
    testCases: [],
    description: "",
    challengeName: "",
    user: "",
    hashtags: [],
  });
  // sets language for compiler api
  const [lang, setLang] = useState({
    name: "javascript",
    mode: "javascript",
  });
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
        const {
          testCases,
          description,
          challengeName,
          user,
          hashtags,
        } = response.data;
        setAlgorithm({
          ...algorithm,
          testCases,
          description,
          challengeName,
          user,
          hashtags,
        });
        // gets status of star (ie. liked/disliked)
        API.getStar(algorithmId, username)
          .then((starRes) => {
            setStar(starRes.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useRef allows access to the code mirror instance and its methods
  useEffect(() => {
    const editorOut = codeOutput.current.getCodeMirror();
    editorOut.setSize("100%", 200);
    editorOut.setValue(output);
  }, [output]);

  // toggles star icon off/on
  const toggleStar = () => {
    setStar(!star);
    API.star(algorithmId, star, username)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  // changes the value of the input hook
  const handleInputChange = (e) => {
    setInput(e);
  };

  const handleOptionsChange = (e) => {
    const language = JSON.parse(e.target.value);

    setLang({ ...language });
    setOptions({ ...options, mode: language.mode });
  };

  const handleCodeSubmit = (e) => {
    console.log(lang);
    console.log(options);
    e.preventDefault();
    // stops function if no code is entered
    if (input.length === 0) {
      alert("No code to run!");
      return;
    } else if (!running) {
      // circular progress on button engadged
      setRunning(true);

      // post code/input to server (codeController.js) where third party api call is made
      API.postCode(input, lang.name)
        .then(({ data }) => {
          // if nothing is logged to console alert pops up
          if (!data.out.length && !data.err.length) {
            alert(
              "Remember to call functions or log/print results to console!"
            );
            // if output is null error is logged to console and vice versa
          } else if (!data.out.length) {
            setOutput(data.err);
          } else if (!data.err.length) {
            setOutput(data.out);
          }
          // circular progress stopped
          setRunning(false);
        })
        .catch((err) => {
          setRunning(false);
          console.log(err);
        });
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.mastergrid}>
        <Grid justify="center" item xs={12}>
          <Typography
            className={classes.titleBottom}
            variant="h4"
            color="textPrimary"
            align="center"
          >
            Challenge: {algorithm.challengeName}
          </Typography>
          <Typography align="center">
            <FormControlLabel
              className={classes.star}
              control={
                <Checkbox
                  checked={star}
                  onChange={toggleStar}
                  icon={<StarRate />}
                  checkedIcon={<Stars />}
                  name="checkedH"
                />
              }
              label="Star this Algorithm"
            />
          </Typography>

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
                <Box className={classes.infobox}>
                  {/*bgcolor="text.disabled"*/}
                  <Box
                    bgcolor="primary.main"
                    className={classes.colorbox}
                  ></Box>
                  <Typography
                    className={classes.description}
                    variant="body1"
                    multiline="true"
                    // color="textPrimary"
                    align="left"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {/* Regex replaces breaks with line breaks */}
                    {algorithm
                      ? algorithm.description.replace(/(<br>)/g, "\n")
                      : ""}
                  </Typography>
                </Box>
                {algorithm.testCases.length > 0 ? (
                  <>
                    <Typography
                      className={classes.titleBottom}
                      variant="h5"
                      color="textPrimary"
                      align="left"
                    >
                      Test Cases
                    </Typography>
                    <Typography className={classes.instructions}>
                      Cases to test your algorithm.
                    </Typography>
                    <Typography className={classes.instructions}>
                      If your code output matches all of those below you just
                      solved the algorithm!
                    </Typography>
                  </>
                ) : (
                  ""
                )}

                {/* populate all test cases if they exist */}
                {algorithm
                  ? algorithm.testCases.map((algo, index) => (
                      <Box
                        key={`Test Case ${index + 1}`}
                        className={classes.infobox}
                      >
                        <List>
                          <Box key={index} className={classes.list}>
                            <ListItemAvatar>
                              <Avatar>
                                <Code />
                              </Avatar>
                            </ListItemAvatar>
                            <div>
                              <ul className={classes.listItem}>
                                <li>Input: {algo.input}</li>
                                <br />
                                <li>Output: {algo.output}</li>
                                <br />
                              </ul>
                            </div>
                          </Box>
                        </List>
                      </Box>
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
                  ? algorithm.hashtags.map((hashtag, index) => (
                      <Chip
                        label={hashtag}
                        key={index}
                        color="secondary"
                        size="medium"
                        className={classes.chip}
                      />
                    ))
                  : ""}
              </Paper>
            </Grid>
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
                <Typography className={classes.instructions}>
                  Type code here!
                </Typography>
                <Typography className={classes.instructions}>
                  If you use a function be sure to call it.
                </Typography>
                <Typography className={classes.instructions}>
                  Remember to print/log any returns to the console.
                </Typography>
                <Box border={1}>
                  <CodeMirror
                    className={classes.codeMirror}
                    name="code"
                    value={input}
                    onChange={handleInputChange}
                    options={options}
                  ></CodeMirror>
                </Box>
                
                  <Button
                    onClick={handleCodeSubmit}
                    variant="contained"
                    color="primary"
                    className={classes.runButton}
                  >
                    {/* Upon code submit 'running' is set to True, upon API response set to false */}
                    {running ? (
                      <CircularProgress size={30} color="white" />
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
                      value={JSON.stringify(lang).replace(" ", "")}
                      onChange={handleOptionsChange}
                      label="Language"
                      name="language"
                    >
                      {/* object stored as string allows stored values for api lang parameter and code mirror mode */}
                      <MenuItem
                        value={'{"name":"javascript","mode":"javascript"}'}
                      >
                        Node.js
                      </MenuItem>
                      <MenuItem value={'{"name":"python3","mode":"python"}'}>
                        Python3
                      </MenuItem>
                      <MenuItem value={'{"name":"go","mode":"go"}'}>
                        Golang
                      </MenuItem>
                      <MenuItem value={'{"name":"java","mode":"clike"}'}>
                        Java
                      </MenuItem>
                      <MenuItem value={'{"name":"r","mode":"r"}'}>R</MenuItem>
                      <MenuItem value={'{"name":"csharp","mode":"clike"}'}>
                        C#
                      </MenuItem>
                      <MenuItem value={'{"name":"ruby","mode":"ruby"}'}>
                        Ruby
                      </MenuItem>
                      <MenuItem value={'{"name":"cpp","mode":"clike"}'}>
                        C++
                      </MenuItem>
                      <MenuItem value={'{"name":"c","mode":"clike"}'}>
                        C
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Typography
                  className={classes.titleBottom}
                  variant="h5"
                  color="textPrimary"
                  align="left"
                >
                  Output
                </Typography>
                <Box border={1}>
                  <CodeMirror
                    className={classes.codeMirror}
                    name="code output"
                    ref={codeOutput}
                    lineNumbers={false}
                    options={{
                      mode: "Shell",
                      theme: options.theme,
                      lineWrapping: true,
                      readOnly: true,
                    }}
                  ></CodeMirror>
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
