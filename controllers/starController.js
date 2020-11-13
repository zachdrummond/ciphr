const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../models");

router.post("/api/star/:id", (req, res) => {
  if (req.body.data.starred) {
    db.Algorithms.findOne(
      { _id: req.params.id },
      { $inc: { stars: 1 } },
      { new: true }
    ).then((response) => {
      console.log(response);
    });
  } else {
    db.Algorithms.findOne(
      { _id: req.params.id },
      { $inc: { stars: -1 } },
      { new: true }
    ).then((response) => {
      console.log(response);
    });
  }
});
