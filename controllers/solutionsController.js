const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require("jsonwebtoken");

router.post("/api/solutions", (req, res) => {
  const { code, description, language, algorithmId, token } = req.body;

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
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

router.put("/api/solutions/:solutionId", function (request, response) {
  const { description, code, language } = request.body;

  db.Solutions.findByIdAndUpdate(
    request.params.solutionId,
    { description: description, code: code, language: language },
    { new: true }
  )
    .then((updated) => {
      response.status(200).json({
        error: false,
        data: updated,
        message: "Successfully updated solution.",
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        error: true,
        data: null,
        message: "An error occurred updating your solution.",
      });
    });
});

router.delete("/api/solutions/:solutionId", function (request, response) {
  db.Solutions.findByIdAndDelete(request.params.solutionId)
    .then((result) => {
      db.Algorithms.updateOne({
        $pull: { solutions: request.params.solutionId },
      })
        .then((result) => {
          response.status(200).json({
            error: false,
            data: null,
            message: "Successfully deleted solution and updated user.",
          });
        })
        .catch((error) => {
          console.log(error);
          response.status(500).json({
            error: true,
            data: null,
            message: "An error occurred deleting the user's algorithm.",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        error: true,
        data: null,
        message: "An error occurred deleting the algorithm.",
      });
    });
});

module.exports = router;
