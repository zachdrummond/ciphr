const express = require("express");
const router = express.Router();
const axios = require("axios");

// get request for code compiler results
function getCompiled(postRes, res, attempts = 1) {
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
      } else if (data.status === "running" && attempts < 4) {
        attempts++;
        setTimeout(() => {
          // recursive function.
          // if compiler is still executing code function is called again after timeout
          getCompiled(postRes, res, attempts);
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
  const language = request.body.lang;
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
