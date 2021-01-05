import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "react-codemirror";
import "codemirror/lib/codemirror.css";
import { MenuItem, FormControl, Select, InputLabel, Button } from "@material-ui/core";

const Solutions = () => {
  const codeOutput = useRef();

  const [lang, setLang] = useState("JavaScript")

  useEffect(() => {
    const editorOut = codeOutput.current.getCodeMirror();
    editorOut.setSize("100%", 200);
    // editorOut.setValue(output);
  }, []);

  const handleLangChange = (e) => {
      setLang(e.target.value)
  }

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
          value={lang}
            onChange={handleLangChange}
          label="Language"
          name="language"
        >
          {/* object stored as string allows stored values for api lang parameter and code mirror mode */}
          <MenuItem value={'javascript'}>
            Node.js
          </MenuItem>
          <MenuItem value={'python3'}>
            Python3
          </MenuItem>
          <MenuItem value={'go'}>Golang</MenuItem>
          <MenuItem value={'java'}>Java</MenuItem>
          <MenuItem value={'r'}>R</MenuItem>
          <MenuItem value={'csharp'}>C#</MenuItem>
          <MenuItem value={'ruby'}>Ruby</MenuItem>
          <MenuItem value={'cpp'}>C++</MenuItem>
          <MenuItem value={'c'}>C</MenuItem>
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
