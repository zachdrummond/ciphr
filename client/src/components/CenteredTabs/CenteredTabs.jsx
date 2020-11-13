import React, {useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const CenteredTabs = ({tabValue}) => {
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
  useEffect(() => {
    
    console.log(tabValue);
  }, []);

  return (
    <Tabs
      className={classes.root}
      value={tabValue}
      // onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      {/* <Link to={"/home"}> */}
        <Tab onClick={handleChangeAll} label="All Algorithms" />
      {/* </Link> */}
      {/* <Link to={"/algorithms"}> */}
        <Tab onClick={handleChangeMy} label="My Algorithms" />
      {/* </Link> */}
    </Tabs>
  );
};

export default CenteredTabs;
