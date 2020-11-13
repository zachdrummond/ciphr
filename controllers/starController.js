const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../models");

router.post("/api/star/:id", (req, res) => {
  // if algorithm is starred the star key is incremented, unstarred = decrement
  if (!req.body.status) {
    db.Algorithms.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { stars: 1 } },
      { new: true }
    ).then((response) => {
      console.log("increase: " + response);
    });
  } else {
    db.Algorithms.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { stars: -1 } },
      { new: true }
    ).then((response) => {
      console.log("decrease: " + response);
    });
  }
});

module.exports = router;
