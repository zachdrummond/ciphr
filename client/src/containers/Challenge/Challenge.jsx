// React
import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
// Material UI
import {
  Box,
  Button,
  Container,
  Chip,
  Grid,
  makeStyles,
  Paper,
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
import AuthContext from "../../context/AuthContext/AuthContext";
import CenteredTabs from "../../components/CenteredTabs/CenteredTabs";
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
import "codemirror/addon/edit/closebrackets";
// import all the themes from codemirror/theme/...
import "codemirror/theme/material-darker.css";
// components
import LangDropdown from "../../components/LangDropdown/LangDropdown";
// global state
import { store } from "../../context/Store/Store";

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
  const globalState = useContext(store);
  const { dispatch } = globalState;

  // code mirror editor settings
  const [options, setOptions] = useState({
    mode: "javascript",
    lineNumbers: true,
    theme: "",
    autofocus: true,
    autoCloseBrackets: true,
  });

  const [output, setOutput] = useState("");
  // algorithm info is set on page load
  const [algorithm, setAlgorithm] = useState({
    testCases: [],
    description: "",
    challengeName: "",
    user: "",
    hashtags: [],
  });

  // state of code compiler after submit
  const [running, setRunning] = useState(false);
  // star status
  const [star, setStar] = useState(false);

  useEffect(() => {
    // sets code mirror theme on page theme change
    !theme
      ? setOptions({ ...options, theme: "material-darker" })
      : setOptions({ ...options, theme: "default" });
  }, [theme]);

  useEffect(() => {
    // sets code mirror theme and mode on page load
    const currLang = globalState.state.lang.get(algorithmId);

    !theme
      ? setOptions({
          ...options,
          theme: "material-darker",
          mode: nameToMode(currLang),
        })
      : setOptions({
          ...options,
          theme: "default",
          mode: nameToMode(currLang),
        });
  }, []);

  useEffect(() => {
    // make API call to get algorithm by id
    API.getAlgorithm(algorithmId)
      .then((response) => {
        const {
          testCases,
          description,
          challengeName,
          userId,
          hashtags,
        } = response.data;
        setAlgorithm({
          ...algorithm,
          testCases,
          description,
          challengeName,
          userId,
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
    dispatch({
      type: "CODE_CHANGE",
      payload: { code: e, codeId: algorithmId },
    });
  };

  const nameToMode = (lang) => {
    switch (lang) {
      case "python3":
        return "python";
      case "c":
        return "clike";
      case "cpp":
        return "clike";
      case "csharp":
        return "clike";
      case "java":
        return "clike";
      default:
        return lang;
    }
  };

  const handleOptionsChange = (e) => {
    const lang = e.target.value;

    dispatch({ type: "LANG_CHANGE", payload: { lang, langId: algorithmId } });
    setOptions({ ...options, mode: nameToMode(lang) });
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();

    const { code, lang } = globalState.state;
    const codeInput = code.get(algorithmId);
    let langInput = lang.get(algorithmId);
    // stops function if no code is entered
    if (codeInput.length === 0) {
      alert("No code to run!");
      return;
    } else if (!running) {
      // circular progress on button engadged
      setRunning(true);

      if (!langInput) {
        langInput = "javascript";
      }

      // post code/input to server (codeController.js) where third party api call is made
      API.postCode(codeInput, langInput)
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
            Added by: {algorithm.userId?.username}
          </Typography>
          <CenteredTabs
            tabValue={0}
            tab1={"Challenge"}
            tab2={"Solutions"}
            link1={`/algorithms/${algorithmId}`}
            link2={`/solutions/${algorithmId}`}
          />
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
                    value={globalState.state.code.get(algorithmId)}
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
                <LangDropdown
                  classes={classes.formControl}
                  lang={globalState.state.lang.get(algorithmId)}
                  handleOptionsChange={handleOptionsChange}
                />
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
