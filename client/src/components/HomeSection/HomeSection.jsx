import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// Material UI
import {
  Container,
  Grid,
  List,
  makeStyles,
  Typography,
  Paper,
} from "@material-ui/core";
// File Modules
import AlgorithmListItem from "../../components/AlgorithmListItem/AlgorithmListItem";
import HomeCard from "../HomeCard/HomeCard";
import CenteredTabs from "../CenteredTabs/CenteredTabs";
import Divider from "@material-ui/core/Divider";

// Styling for Specific Components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    marginBottom: "150px",
  },
  paper: {
    padding: theme.spacing(2, 0),
    margin: theme.spacing(0, 2),
    textAlign: "center",
    color: theme.palette.text.primary,
    fontSize: "1.5rem",
  },
  h5: {
    margin: theme.spacing(4, 2),
  },
}));

const HomeSection = ({
  size,
  title,
  children,
  algorithms,
  handleDelete,
  tabValue,
  search,
}) => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [lastItem, setLastItem] = useState(10);

  let list = [];

  const fetchData = () => {
    console.log(`fetchData called`);
    if (!search && algorithms.length && items.length >= algorithms.length) {
      setHasMore(false);
      return;
    }
    if (algorithms.length > lastItem) {
      for (let i = 0; i < lastItem; i++) {
        list.push(algorithms[i]);
      }
      setItems(list);
      setLastItem(lastItem + 10);
    } else {
      for (let i = 0; i < algorithms.length; i++) {
        list.push(algorithms[i]);
      }
      setItems(list);
    }
  };

  useEffect(() => {
    fetchData();
  }, [algorithms]);

  useEffect(() => {
    console.log(`search`);
    setLastItem(10);
    setHasMore(true);
    setItems([]);
    list = [];
    fetchData();
  }, [search]);
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid item xs={size}>
        <Paper className={classes.paper}>
          <CenteredTabs
            tabValue={tabValue}
            tab1={"All Algorithms"}
            tab2={"My Algorithms"}
            link1={"/home"}
            link2={"/algorithms"}
          />
          <Divider />
          <Typography
            variant="h5"
            color="textPrimary"
            align="center"
            className={classes.h5}
          >
            {title}
          </Typography>

          <Container align="center">
            {children}
            <InfiniteScroll
              dataLength={items.length} //This is important field to render the next data
              next={fetchData}
              hasMore={hasMore}
            >
              <List component="nav" className={classes.root}>
                {items.length > 0 ? (
                  items.map((item) => {
                    const {
                      _id,
                      challengeName,
                      userId,
                      stars,
                      hashtags,
                      description,
                    } = item;
                    return (
                      <AlgorithmListItem
                        handleDelete={handleDelete}
                        key={_id}
                        title={challengeName}
                        author={userId?.username}
                        id={_id}
                        stars={stars}
                        hashtags={hashtags ? hashtags.join(" ") : ""}
                        description={description}
                      />
                    );
                  })
                ) : (
                  <HomeCard
                    text={
                      search
                        ? "No results found."
                        : "You haven't added anything yet. Maybe today is the day!"
                    }
                  />
                )}
              </List>
            </InfiniteScroll>
          </Container>
        </Paper>
      </Grid>
    </Container>
  );
};

export default HomeSection;
