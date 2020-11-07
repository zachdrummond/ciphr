const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/api/code", (req, res) => {
  console.log(req.body);
  axios({
    method: "POST",
    url: "https://paiza-io.p.rapidapi.com/runners/create",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-rapidapi-host": "paiza-io.p.rapidapi.com",
      "x-rapidapi-key": "59d0c27c79msh6e6814003e3803ep1e5484jsn5fecf295231f",
      useQueryString: true,
    },
    params: {
      language: req.body.language,
      source_code: req.body.code,
    },
    data: {},
  })
    .then((postResponse) => {
      axios({
        method: "GET",
        url: "https://paiza-io.p.rapidapi.com/runners/get_details",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "paiza-io.p.rapidapi.com",
          "x-rapidapi-key":
            "59d0c27c79msh6e6814003e3803ep1e5484jsn5fecf295231f",
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
          // console.log(output);
          res.status(200).json({
            success: true,
            out: output,
            err: error,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: true,
            data: null,
            message: "Unable to sign up",
          });
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
