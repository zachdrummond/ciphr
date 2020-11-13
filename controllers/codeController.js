const express = require("express");
const router = express.Router();
const axios = require("axios");

// global variable keeps track of API get request attempts
let attempts = 0;
// formats parameters for API call
function compilerLang(lang) {
  switch (lang) {
    case "python":
      return "python3";
    case "go":
      return "go";
    case "java":
      return "java";
    case "r":
      return "r";
    case "ruby":
      return "ruby";
    case "clike":
      return "csharp";
    case "sql":
      return "mysql";
    default:
      return "javascript";
  }
}

// get request for code compiler results
function getCompiled(postRes, res) {
  axios({
    method: "GET",
    url: "https://paiza-io.p.rapidapi.com/runners/get_details",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "paiza-io.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAI_API_KEY,
      useQueryString: true,
    },
    params: {
      id: postRes.data.id,
    },
  })
    .then(({ data }) => {
      if (data.status === "completed") {
        // checks out build exit codes for compiled languages like go, c#, etc. Value of 0 = success!
        if (!data.build_exit_code) {
          res.status(200).json({
            success: true,
            out: data.stdout,
            err: data.stderr,
          });
        } else {
          res.status(200).json({
            success: true,
            out: data.build_stdout,
            err: data.build_stderr,
          });
        }
      } else if (data.status === "running" && attempts < 3) {
        attempts++;
        setTimeout(() => {
          // recursive function.
          // if compiler is still executing code function is called again after timeout
          getCompiled(postRes, res);
        }, 500);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "unable to get code from compiler API",
      });
    });
}

router.post("/api/code", (request, response) => {
  const language = compilerLang(request.body.mode);
  // post request for submitting code. Id is returned for use in get request
  axios({
    method: "POST",
    url: "https://paiza-io.p.rapidapi.com/runners/create",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-rapidapi-host": "paiza-io.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAI_API_KEY,
      useQueryString: true,
    },
    params: {
      language: language,
      source_code: request.body.input,
    },
    data: {},
  })
    .then((postResponse) => {
      getCompiled(postResponse, response);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({
        error: true,
        data: null,
        message: "unable to post code to compiler API",
      });
    });
});

module.exports = router;
