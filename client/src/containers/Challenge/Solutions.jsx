// React
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// Material UI
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Stars, StarRate } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
// File Modules
import API from "../../utils/API";
import AuthContext from "../../context/AuthContext/AuthContext";
import CenteredTabs from "../../components/CenteredTabs/CenteredTabs";
import LangDropdown from "../../components/LangDropdown/LangDropdown";
import SolutionTab from "../../components/SolutionTab/SolutionTab";
import SnackbarContext from "../../context/SnackbarContext/SnackbarContext";
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
// global state
import { store } from "../../context/Store/Store";
import SortBy from "../../components/SortBy/SortBy";

const useStyles = makeStyles((theme) => ({
  mastergrid: {
    margin: theme.spacing(8, 0),
  },
  codeMirror: {
    fontSize: 14,
  },
  column: {
    margin: theme.spacing(1, 0),
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
    float: "right",
  },
  instructions: {
    fontSize: 12,
  },
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(1, 1),
  },
  runButton: {
    margin: 20,
    width: 100,
    height: 40,
  },
  titleBottom: {
    marginBottom: theme.spacing(3),
    width: "100%",
  },
  star: {},
  codeMirror: {
    fontSize: 14,
  },
  sort: {
    width: "200px",
  },
}));

const Solutions = ({ theme }) => {
  const classes = useStyles();
  const { algorithmId } = useParams();
  const { username, jwt } = useContext(AuthContext);
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const {
    snackbarMessage,
    snackbarOpen,
    setSnackbarOpen,
    setSnackbarMessage,
  } = useContext(SnackbarContext);

  // code mirror editor settings
  const [options, setOptions] = useState({
    mode: "javascript",
    lineNumbers: true,
    theme: "",
    autofocus: true,
    autoCloseBrackets: true,
  });
  // sets the code input in first text area and language in dropdown select as state.
  // find in dev tools components under 'Challenge'
  // const [codeInput, setCodeInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  // algorithm info is set on page load
  const [algorithm, setAlgorithm] = useState({
    testCases: [],
    description: "",
    challengeName: "",
    user: "",
    hashtags: [],
  });

  // star status
  const [star, setStar] = useState(false);

  // solutions
  const [solutions, setSolutions] = useState("");

  const [starredSolutions, setStarredSolutions] = useState([]);

  const [sortBy, setSortBy] = useState("language");

  useEffect(() => {
    // sets code mirror theme on page theme change
    !theme
      ? setOptions({ ...options, theme: "material-darker" })
      : setOptions({ ...options, theme: "default" });
  }, [theme]);

  useEffect(() => {
    // sets code mirror theme and mode on page load
    let currLang = globalState.state.lang.get(algorithmId);
    if (!currLang) {
      currLang = "javascript";
    }

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

        getSolutions();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getSolutions = () => {
    API.getSolutions(algorithmId)
      .then((res) => {
        setSolutions(res.data.data);
        API.getStarredSolutions(username)
          .then((starredRes) => {
            // console.log(starredRes);
            setStarredSolutions(starredRes.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // toggles star icon off/on
  const toggleStar = () => {
    setStar(!star);
    API.star(algorithmId, star, username)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // changes the value of the input hooks
  const handleCodeInputChange = (e) => {
    // setCodeInput(e);
    dispatch({
      type: "CODE_CHANGE",
      payload: { code: e, codeId: algorithmId },
    });
  };
  const handleDescriptionInputChange = (e) => {
    setDescriptionInput(e.target.value);
  };

  const handleDelete = (id) => {
    API.deleteSolution(id)
      .then((res) => {
        setSnackbarMessage("Solution successfully deleted!");
        setSnackbarOpen(true);
        getSolutions();
      })
      .catch((err) => console.log(err));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { code, lang } = globalState.state;
    const codeInput = code.get(algorithmId);
    let langInput = lang.get(algorithmId);
    // stops function if no code is entered
    if (code.length === 0) {
      return;
    }
    if (!langInput) {
      langInput = "javascript";
    }

    API.postSolution(codeInput, descriptionInput, langInput, algorithmId, jwt)
      .then((response) => {
        API.getSolutions(algorithmId)
          .then((res) => {
            setSolutions(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSortSelection = (e) => {
    setSortBy(e.target.value);
  };

  const sortBySelection = (solList) => {
    // sort by language or date
    if (solList.length) {
      solList.sort((a, b) => {
        let A;
        let B;
        switch (sortBy) {
          case "new":
            A = new Date(a.createdAt);
            B = new Date(b.createdAt);
            break;
          case "old":
            A = new Date(b.createdAt);
            B = new Date(a.createdAt);
            break;
          case "high":
            A = b.stars;
            B = a.stars;
            break;
          default:
            A = a.language.toUpperCase();
            B = b.language.toUpperCase();
            break;
        }
        if (A < B) {
          return -1;
        }
        if (A > B) {
          return 1;
        }
        return 0;
      });
    }
    return solList;
  };

  const toggledStar = (e) => {
    const id = e.target.value;
    let status = false;
    for (const star of starredSolutions) {
      if (star.id === id) {
        status = true;
      }
    }
    API.starSolution(id, status, username)
      .then((starRes) => {
        setStarredSolutions(starRes.data.data);
        API.getSolutions(algorithmId)
          .then((res) => {
            setSolutions(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
            tabValue={1}
            tab1={"Challenge"}
            tab2={"Solutions"}
            link1={`/algorithms/${algorithmId}`}
            link2={`/solutions/${algorithmId}`}
          />
        </Grid>
        <Grid className={classes.column} item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.titleBottom}
              mb={2}
              variant="h5"
              color="textPrimary"
              align="left"
            >
              Code
            </Typography>
            <Box border={1}>
              <CodeMirror
                className={classes.codeMirror}
                name="code"
                value={globalState.state.code.get(algorithmId)}
                onChange={handleCodeInputChange}
                options={options}
              ></CodeMirror>
            </Box>

            <TextField
              variant="outlined"
              multiline
              fullWidth
              required
              rowsMax={4}
              label="Solution Description"
              name="description"
              value={descriptionInput}
              onChange={handleDescriptionInputChange}
            ></TextField>

            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              className={classes.runButton}
            >
              Submit
            </Button>
            <LangDropdown
              classes={classes.formControl}
              lang={globalState.state.lang.get(algorithmId)}
              handleOptionsChange={handleOptionsChange}
            />
          </Paper>
        </Grid>
        <Grid>
          <SortBy
            handleSortSelection={handleSortSelection}
            sortBy={sortBy}
            classes={classes.sort}
          />
        </Grid>
        <Grid justify="center" item xs={12}>
          {solutions
            ? sortBySelection(solutions).map((solution) => (
                <SolutionTab
                  currentUser={username}
                  algorithmId={algorithmId}
                  code={solution.code}
                  description={solution.description}
                  createdBy={solution.createdBy.username}
                  createdAt={solution.createdAt}
                  lang={solution.language}
                  stars={solution.stars}
                  id={solution._id}
                  toggledStar={toggledStar}
                  starredSolutions={starredSolutions}
                  handleDelete={handleDelete}
                />
              ))
            : ""}
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackbarMessage}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Grid>
    </Container>
  );
};

export default Solutions;
