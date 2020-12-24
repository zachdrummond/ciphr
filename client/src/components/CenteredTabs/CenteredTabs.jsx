import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Tabs, Tab } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const CenteredTabs = ({ tabValue }) => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(tabValue);

  const handleChangeAll = () => {
    setValue(0);
    history.push("/home");
  };
  const handleChangeMy = () => {
    setValue(1);
    history.push("/algorithms");
  };

  return (
    <Tabs
      className={classes.root}
      value={value?value:tabValue}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab onClick={handleChangeAll} label="All Algorithms" />
      <Tab onClick={handleChangeMy} label="My Algorithms" />
    </Tabs>
  );
};

export default CenteredTabs;
