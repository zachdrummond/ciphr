import {
  AppBar,
  Box,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  appBar: {
    top: 'auto',
    position: "relative",
    bottom: 0,
  },
});

export default function Footer() {
  const classes = useStyles();
  
  return (
    <AppBar className={classes.appBar} position="fixed" color="primary">
        <Toolbar>
          <Box margin="auto">
          <Typography
            align="center"
            position="static"
            variant="body1"
            color="inherit"
          >
            Ciphr &copy; 2020 -- Zach Drummond, Calvin Griffin, Joseph
            Perry, Andrew Stewart
          </Typography>
          </Box>
        </Toolbar>
    </AppBar>
  );
}
