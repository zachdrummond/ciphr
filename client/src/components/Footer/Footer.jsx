// Material UI
import { Box, Grid, makeStyles, Toolbar, Typography } from "@material-ui/core";
// File Modules
import MeetTheTeam from "../MeetTheTeam/MeetTheTeam";

const useStyles = makeStyles({
  footer: {
    padding: "2px",
  },
  grid: {
    justifyContent: "center",
  },
});

export default function Footer() {
  const classes = useStyles();

  return (
    <Box className={classes.footer} color="white" bgcolor="primary.main">
      <Toolbar>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item>
            <Typography
              align="center"
              position="static"
              variant="body1"
              color="inherit"
            >
              Ciphr &copy; 2020
            </Typography>
          </Grid>
          <Grid item>
            <MeetTheTeam />
          </Grid>
        </Grid>
      </Toolbar>
    </Box>
  );
}
