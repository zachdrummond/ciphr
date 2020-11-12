import {
    AppBar,
    Container,
    makeStyles,
    Toolbar,
    Typography,
  } from "@material-ui/core";

  const useStyles = makeStyles({
    toolbar: {
      align: "center",
    },
  });

export default function Footer() {
    return (
        
        <AppBar className={useStyles.toolbar} position="static" color="primary">
          <Container maxWidth="md">
            <Toolbar  >
              <Typography  align="center" position="static" variant="body1" color="inherit">
                 ALGOMASTER &copy; 2020 -- Zach Drummond, Calvin Griffin, Joseph Perry, Andrew Stewart
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        
    )
}