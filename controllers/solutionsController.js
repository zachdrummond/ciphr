const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/api/solutions", (req, res) => {
    console.log(req.body)
    // db.Solutions.create({
    //     code: "",
    //     description: ""
    // }).then(solutionRes => {
    //     console.log(solutionRes);
    // }).catch(err => {
    //     console.log(err);
    // })
})

module.exports = router;
