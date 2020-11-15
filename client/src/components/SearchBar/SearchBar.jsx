// Material UI
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  input: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
  },
  search: {
    position: "relative",
    // backgroundColor: "gray",
    width: "100%",
    borderRadius: "4px",
    border: "thin solid gray",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const SearchBar = ({ search, handleSearch }) => {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search by Name or #Hashtag"
        autoFocus
        className={classes.input}
        name="search"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
