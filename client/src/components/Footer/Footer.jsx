import {
  Box,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  footer: {
    padding: "8px",
  },
});

export default function Footer() {
  const classes = useStyles();

  return (
    <Box className={classes.footer} color="white" bgcolor="primary.main">
      <Toolbar>
        <Box margin="auto">
          <Typography
            align="center"
            position="static"
            variant="body1"
            color="inherit"
          >
            Ciphr &copy; 2020 — Zach Drummond, Calvin Griffin, Joseph Perry,
            Andrew Stewart
          </Typography>
        </Box>
      </Toolbar>
    </Box>
  );
}
