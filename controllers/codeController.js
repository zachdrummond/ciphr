const express = require("express");
const router = express.Router();
const axios = require("axios");

function compilerLang(lang) {
  switch (lang) {
    case "python":
      return "python3";
    case "go":
      return "go";
    case "clike":
      return "java";
    case "r":
      return "r";
    default:
      return "javascript";
  }
}

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

async function getCompiled(postRes) {
  let attempts = 0;
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
    if (data.status === "running" && attempts < 3) {
      setTimeout(() => {
        attempts++;
        // recursive function
        getCompiled(postRes);
      }, 500);
    } else {
      if (!data.build_exit_code) {
        // console.log(data);
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
