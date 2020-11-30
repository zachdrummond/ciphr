// Material UI
import {
  Avatar,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
// Images
import Zach from "../../images/Zach.jpg";
import Calvin from "../../images/Calvin.jpg";
import Joseph from "../../images/Joseph.jpg";
import Andrew from "../../images/Andrew.jpg";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Person = ({ name, gitHub, linkedIn, email }) => {
  const classes = useStyles();

  const setImage = () => {
    switch (name) {
        case("Zach Drummond") : return Zach;
        case("Calvin Griffin") : return Calvin;
        case("Joseph Perry") : return Joseph;
        case("Andrew Stewart"): return Andrew;
        default: return "";
    }
  }

  return (
    <Grid item xs={3}>
      <Avatar alt={name} src={setImage()} className={classes.large} />
      <Typography variant="h6">{name}</Typography>
      <IconButton color="inherit" href={gitHub} target="_blank">
        <GitHubIcon />
      </IconButton>
      <IconButton color="inherit" href={linkedIn} target="_blank">
        <LinkedInIcon />
      </IconButton>
      <IconButton color="inherit" href={email} target="_blank">
        <EmailIcon />
      </IconButton>
    </Grid>
  );
};

export default Person;
