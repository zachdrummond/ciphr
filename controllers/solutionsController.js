const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/api/solutions", (req, res) => {
    const {code, description, language} = req.body;
    
    db.Solutions.create({
        code: code.replace(/(\n)/g, "<br>").replace(/(\t)/g, "<span>"),
        description: description.replace(/(\n)/g, "<br>").replace(/(\t)/g, "<span>"),
        language: language
    }).then(solutionRes => {
        console.log(solutionRes);
        res.status(200).json(solutionRes)
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;
