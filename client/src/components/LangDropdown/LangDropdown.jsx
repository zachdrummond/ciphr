import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const LangDropdown = ({ classes, lang, handleOptionsChange }) => {
  return (
    <FormControl variant="outlined" className={classes}>
      <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={lang ? lang : "javascript"}
        onChange={handleOptionsChange}
        label="Language"
        name="language"
      >
        <MenuItem value="javascript">Node.js</MenuItem>
        <MenuItem value="python3">Python3</MenuItem>
        <MenuItem value="go">Golang</MenuItem>
        <MenuItem value="java">Java</MenuItem>
        <MenuItem value="r">R</MenuItem>
        <MenuItem value="csharp">C#</MenuItem>
        <MenuItem value="ruby">Ruby</MenuItem>
        <MenuItem value="cpp">C++</MenuItem>
        <MenuItem value="c">C</MenuItem>
      </Select>
    </FormControl>
  );
};

LangDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  handleOptionsChange: PropTypes.func.isRequired,
};

export default LangDropdown;
