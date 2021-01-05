// React
import { useState } from "react";
//Material UI
import { makeStyles, Tabs, Tab } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Challenge2 = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      className={classes.root}
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
    >
      <Tab label="Challenge" />
      <Tab label="Solutions" />
    </Tabs>
  );
};

export default Challenge2;
