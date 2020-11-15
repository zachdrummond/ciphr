// Material UI
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backgroundColor: {
    // backgroundColor: "white",
    border: "none",
    padding: theme.spacing(4),
  },
  color: {
    color: "text.disabled",
  },
}));

const HomeCard = ({ text }) => {
  const classes = useStyles();
  return (
    <Card className={classes.backgroundColor} variant="outlined">
      <CardContent className={classes.backgroundColor}>
        <Typography className={classes.color}>{text}</Typography>
      </CardContent>
    </Card>
  );
};

export default HomeCard;
