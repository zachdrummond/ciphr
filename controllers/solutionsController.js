const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/api/solutions", (req, res) => {
  const { code, description, language, algorithmId } = req.body;

  db.Solutions.create({
    code: code,
    description: description,
    language: language,
  })
    .then((solutionRes) => {
      console.log(solutionRes);
      db.Algorithms.findByIdAndUpdate(algorithmId, {$push: {solutions: solutionRes}}).then(updateRes => {
        res.status(200).json(updateRes);
      }).catch(err => {
          console.log(err);
      });
      // res.status(200).json(solutionRes)
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
