// React
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// Material UI
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Stars, StarRate } from "@material-ui/icons";
// File Modules
import API from "../../utils/API";
import AuthContext from "../../context/AuthContext/AuthContext";
import CenteredTabs from "../../components/CenteredTabs/CenteredTabs";

const useStyles = makeStyles((theme) => ({
  mastergrid: {
    margin: theme.spacing(8, 0),
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
  const { username } = useContext(AuthContext);

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

  // toggles star icon off/on
  const toggleStar = () => {
    setStar(!star);
    API.star(algorithmId, star, username)
      .then((response) => {})
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
      </Grid>
    </Container>
  );
};

export default Solutions;