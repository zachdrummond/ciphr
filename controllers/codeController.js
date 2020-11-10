const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/api/code", (req, res) => {
  console.log(req.body);
  // posts code from text area to the compiler API
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
      language: req.body.mode,
      source_code: req.body.input,
    },
    data: {},
  })
    .then((postResponse) => {
      // the response of the code compiler post request is an id which is used to get the compiler result
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
          id: postResponse.data.id,
        },
      })
        .then((getResponse) => {
          console.log(getResponse.data);
          const output = getResponse.data.stdout;
          const error = getResponse.data.stderr;
          // send standard output and error to the front end
          res.status(200).json({
            success: true,
            out: output,
            err: error,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            error: true,
            data: null,
            message: "Unable get compiled code",
          });
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
