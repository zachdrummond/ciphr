import React, { useEffect, useRef } from "react";
import CodeMirror from "react-codemirror";
import "codemirror/lib/codemirror.css";
import { MenuItem, FormControl, Select, InputLabel, Button } from "@material-ui/core";

const Solutions = () => {
  const codeOutput = useRef();

  useEffect(() => {
    const editorOut = codeOutput.current.getCodeMirror();
    editorOut.setSize("100%", 200);
    // editorOut.setValue(output);
  }, []);

  return (
    <div>
      <h1>You found me!</h1>
      <CodeMirror
        // className={classes.codeMirror}
        name="code output"
        ref={codeOutput}
        lineNumbers={true}
        // options={{
        //   mode: "Shell",
        //   theme: options.theme,
        //   lineWrapping: true,
        //   readOnly: true,
        // }}
      ></CodeMirror>
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          //   value={JSON.stringify(lang).replace(" ", "")}
          //   onChange={handleOptionsChange}
          label="Language"
          name="language"
        >
          {/* object stored as string allows stored values for api lang parameter and code mirror mode */}
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
      <Button
        // onClick={handleCodeSubmit}
        variant="contained"
        color="primary"
        // className={classes.runButton}
      >Submit Solution</Button>
    </div>
  );
};

export default Solutions;
