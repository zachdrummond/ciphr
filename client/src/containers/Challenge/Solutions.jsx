// React
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// Material UI
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Stars, StarRate } from "@material-ui/icons";
// File Modules
import API from "../../utils/API";
import AuthContext from "../../context/AuthContext/AuthContext";
import CenteredTabs from "../../components/CenteredTabs/CenteredTabs";
import SolutionsTab from "../../components/SolutionTab/SolutionTab";
import LangDropdown from "../../components/LangDropdown/LangDropdown";
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
}));

const Solutions = () => {
  const classes = useStyles();
  const { algorithmId } = useParams();
  const { username, jwt } = useContext(AuthContext);

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
  const [codeInput, setCodeInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

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

  // star status
  const [star, setStar] = useState(false);

  // solutions
  const [solutions, setSolutions] = useState("");

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
  }, []);

  // toggles star icon off/on
  const toggleStar = () => {
    setStar(!star);
    API.star(algorithmId, star, username)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  // changes the value of the input hooks
  const handleCodeInputChange = (e) => {
    setCodeInput(e);
  };
  const handleDescriptionInputChange = (e) => {
    setDescriptionInput(e.target.value);
  };

  const handleOptionsChange = (e) => {
    const language = JSON.parse(e.target.value);

    setLang({ ...language });
    setOptions({ ...options, mode: language.mode });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // stops function if no code is entered
    if (codeInput.length === 0) {
      return;
    }

    API.postSolution(codeInput, descriptionInput, lang.name, algorithmId, jwt)
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
                value={codeInput}
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
              lang={lang}
              handleOptionsChange={handleOptionsChange}
            />
          </Paper>
        </Grid>
        <Grid justify="center" item xs={12}>
          {solutions
            ? solutions.map((solution) => (
                <SolutionsTab
                  code={solution.code}
                  description={solution.description}
                  createdBy={solution.createdBy.username}
                  lang={solution.language}
                />
              ))
            : ""}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Solutions;