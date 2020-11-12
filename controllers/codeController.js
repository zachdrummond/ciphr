const express = require("express");
const router = express.Router();
const axios = require("axios");

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

// sends post request to compiler API and recieves id of request
// calls getCompiled function
async function compilerCall(req, res) {
  const language = compilerLang(req.body.mode);

  try {
    const postResponse = await axios({
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
        source_code: req.body.input,
      },
      data: {},
    });
    const [getOutput, getError] = await getCompiled(postResponse);
    res.status(200).json({
      success: true,
      out: getOutput,
      err: getError,
    });
  } catch (err) {
    console.log(err);
  }
}

// get request for compiled code result
async function getCompiled(postRes) {
  try {
    const { data } = await axios({
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
    });
    // if code still executing re-call the get request for at least 3 attempts
    if (data.status === "running" && attempts < 3) {
      setTimeout(() => {
        attempts++;
        // recursive function. 
        getCompiled(postRes);
      }, 500);
    } else if (attempts === 3) {
      res.status(500).json({
        error: true,
        data: null,
        message: "code compile timed out"
      });
    } else if (data.status !== "running") {
      // handles error for compiled languages like go, c++, etc. Build exit code of 0 is success!
      if (!data.build_exit_code) {
        return [data.stdout, data.stderr];
      } else {
        return [data.build_stdout, data.build_stderr]
      }
    }
  } catch (err) {
    console.log(err);
  }
}

router.post("/api/code", (request, response) => {
  compilerCall(request, response);
});

module.exports = router;
