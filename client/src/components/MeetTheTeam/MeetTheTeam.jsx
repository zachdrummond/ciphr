// React
import React from "react";
// Material UI
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Slide,
  Typography,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
// Images
import Zach from "../../images/Zach.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  bold: {
    fontWeight: "bold",
  },
}));

export default function MeetTheTeam() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button color="secondary" onClick={handleClickOpen}>
        Meet The Team
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <Grid container>
          <DialogContent>
            <Typography align="center" variant="h4" className={classes.bold}>
              Our Team - Fullstack Web Developers
            </Typography>
            <Divider/>
            <Grid item xs={4}>
              <Avatar
                alt="Zach Drummond"
                src={Zach}
                className={classes.large}
              />
              <Typography variant="h6">Zach Drummond</Typography>
              <IconButton
                color="inherit"
                href="https://github.com/zachdrummond"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://www.linkedin.com/in/zachdrummond/"
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="mailto: zachdrummond3@gmail.com"
                target="_blank"
              >
                <EmailIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <Avatar
                alt="Zach Drummond"
                src={Zach}
                className={classes.large}
              />
              <Typography variant="h6">Zach Drummond</Typography>
              <IconButton
                color="inherit"
                href="https://github.com/zachdrummond"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://www.linkedin.com/in/zachdrummond/"
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="mailto: zachdrummond3@gmail.com"
                target="_blank"
              >
                <EmailIcon />
              </IconButton>
            </Grid>
          </DialogContent>
        </Grid>
      </Dialog>
    </div>
  );
}
