
// Material UI
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backgroundColor: {
      backgroundColor: "#dc004e"
  },
  color: {
      color: "white"
  }
}));

const HomeCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.backgroundColor} variant="outlined">
      <CardContent className={classes.backgroundColor}>
        <Typography className={classes.color}>
          You haven't added anything yet. Maybe today is the day!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HomeCard;
