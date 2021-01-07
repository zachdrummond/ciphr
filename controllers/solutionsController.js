const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require("jsonwebtoken");

router.post("/api/solutions", (req, res) => {
  const { code, description, language, algorithmId, token } = req.body;

  jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRndGxjdHpuIiwiaWF0IjoxNjEwMDM5NTA5fQ.WMROPV8tDlxbys_xNKXhgO_KWYRc-Wv6WzI2Yc8MN-s", process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        error: true,
        data: null,
        message: "Invalid token.",
      });
    } else {
      db.Users.findOne({ username: decoded.username })
        .then((userRes) => {
          db.Solutions.create({
            code: code,
            description: description,
            language: language,
            createdBy: userRes,
          })
            .then((solutionRes) => {
              db.Algorithms.findByIdAndUpdate(algorithmId, {
                $push: { solutions: solutionRes },
              })
                .then((updateRes) => {
                  res.status(200).json({
                    error: false,
                    data: null,
                    message: "Successfully added solution",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    error: true,
                    data: null,
                    message: "Failed to update Algorithm model.",
                  });
                });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: true,
                data: null,
                message: "Failed to post solution.",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: true,
            data: null,
            message: "No user found.",
          });
        });
    }
  });
});

router.get("/api/solutions/:algorithmId", (req, res) => {
  const { algorithmId } = req.params;

  db.Algorithms.findById(algorithmId)
    .populate({
      path: "solutions",
      populate: {
        path: "createdBy",
        model: "Users",
        select: "username",
      },
    })
    .then((solutionsRes) => {
      res.status(200).json({
        error: false,
        data: solutionsRes.solutions,
        message: `Solutions for algorithm '${solutionsRes.challengeName}' returned`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: true,
        data: null,
        message: `Algorithm Id '${algorithmId}' does not exist`,
      });
    });
});

module.exports = router;
