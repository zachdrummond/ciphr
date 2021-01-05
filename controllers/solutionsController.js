const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/api/solutions", (req, res) => {
    // console.log(req.body)
    const {code, description, language} = req.body;
    db.Solutions.create({
        code: code,
        description: description,
        language: language
    }).then(solutionRes => {
        console.log(solutionRes);
        res.status(200).json(solutionRes)
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;
