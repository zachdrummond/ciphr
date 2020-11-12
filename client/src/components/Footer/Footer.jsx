import {
    AppBar,
    Container,
    makeStyles,
    Toolbar,
    Typography,
  } from "@material-ui/core";

  const useStyles = makeStyles({
    toolbar: {
      textAlign: "center",
    },
  });

export default function Footer() {
    return (
        <AppBar position="static" color="primary">
          <Container maxWidth="md">
            <Toolbar >
              <Typography className={useStyles.toolbar} align="center" variant="body1" color="inherit">
                &copy; 2020 -- Zach Drummond, Calvin Griffin, Joseph Perry, Andrew Stewart
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}