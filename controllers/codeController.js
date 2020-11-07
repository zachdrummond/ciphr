const express = require("express");
const router = express.Router();

router.post("/api/code", (req, res) => {
    console.log(req.body)
})