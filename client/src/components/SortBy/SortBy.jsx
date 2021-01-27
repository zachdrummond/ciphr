import React from "react";
import PropTypes from "prop-types";
import { FormControl, MenuItem, InputLabel, Select } from "@material-ui/core";

const SortBy = ({ handleSortSelection, sortBy, classes }) => {
  return (
    <FormControl variant="outlined" className={classes}>
      <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={sortBy}
        onChange={handleSortSelection}
        label="sort by"
        name="sort by"
      >
        <MenuItem value="language">Language</MenuItem>
        <MenuItem value="new">Newest First</MenuItem>
        <MenuItem value="old">Oldest First</MenuItem>
        <MenuItem value="high">Highest Rated</MenuItem>
      </Select>
    </FormControl>
  );
};

SortBy.propTypes = {
  handleSortSelection: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default SortBy;
