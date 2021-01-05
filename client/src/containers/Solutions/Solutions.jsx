import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "react-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
} from "@material-ui/core";
import API from "../../utils/API";

const Solutions = () => {
  const solutionCode = useRef();
  const description = useRef();

  const [lang, setLang] = useState("JavaScript");
  const [input, setInput] = useState({
      description: "",
      code: ""
  });

  const [codeOptions, setCodeOptions] = useState({
    mode: "javascript",
    lineNumbers: true,
    theme: "default",
    // autofocus: true,
  });

  const [options, setOptions] = useState({
    mode: "markdown",
    lineNumbers: false,
    theme: "default",
    // autofocus: true,
  });

  useEffect(() => {
    const solution = solutionCode.current.getCodeMirror();
    solution.setSize("50%", 200);
    const textDescription = description.current.getCodeMirror();
    textDescription.setSize("50%", 200);
  }, []);

  const handleLangChange = (e) => {
    const language = JSON.parse(e.target.value)
    setLang(language.name);
    setCodeOptions({...codeOptions, mode: language.mode});
  };

  const handleCodeChange = (e) => {
    setInput({...input, code: e});
  };

  const handleDescriptionChange = (e) => {
    setInput({...input, description: e});
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    const {code, description} = input;
    API.postSolution(code, description, lang).then(solutionsRes => {
        console.log(solutionsRes);
    }).catch(err => {
        console.log(err);
    })

  };

  return (
    <div>
        <h1>Post a Solution!</h1>
      <h2>Solution code</h2>
      <CodeMirror
        // className={classes.codeMirror}
        name="solution"
        ref={solutionCode}
        lineNumbers={true}
        options={codeOptions}
        onChange={handleCodeChange}
        value={input.code}
      ></CodeMirror>
      <h2>Solution Description</h2>
      <CodeMirror
        // className={classes.codeMirror}
        name="description"
        ref={description}
        options={options}
        onChange={handleDescriptionChange}
        value={input.description}
      ></CodeMirror>
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={JSON.stringify(lang).replace(" ", "")}
          onChange={handleLangChange}
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
        onClick={handleCodeSubmit}
        variant="contained"
        color="primary"
        // className={classes.runButton}
      >
        Submit Solution
      </Button>
    </div>
  );
};

export default Solutions;
