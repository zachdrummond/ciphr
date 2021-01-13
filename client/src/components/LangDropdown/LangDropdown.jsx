import React from "react";
import PropTypes from "prop-types";
import {FormControl, InputLabel, Select, MenuItem} from "@material-ui/core";

const LangDropdown = ({classes, lang, handleOptionsChange}) => {
  return (
    <FormControl variant="outlined" className={classes}>
      <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={JSON.stringify(lang).replace(" ", "")}
        onChange={handleOptionsChange}
        label="Language"
        name="language"
      >
        <MenuItem value={'{"name":"javascript","mode":"javascript"}'}>
          Node.js
        </MenuItem>
        <MenuItem value={'{"name":"python3","mode":"python"}'}>
          Python3
        </MenuItem>
        <MenuItem value={'{"name":"go","mode":"go"}'}>Golang</MenuItem>
        <MenuItem value={'{"name":"java","mode":"clike"}'}>Java</MenuItem>
        <MenuItem value={'{"name":"r","mode":"r"}'}>R</MenuItem>
        <MenuItem value={'{"name":"csharp","mode":"clike"}'}>C#</MenuItem>
        <MenuItem value={'{"name":"ruby","mode":"ruby"}'}>Ruby</MenuItem>
        <MenuItem value={'{"name":"cpp","mode":"clike"}'}>C++</MenuItem>
        <MenuItem value={'{"name":"c","mode":"clike"}'}>C</MenuItem>
      </Select>
    </FormControl>
  );
};

LangDropdown.propTypes = {
    classes: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    handleOptionsChange: PropTypes.func.isRequired
};

export default LangDropdown;
