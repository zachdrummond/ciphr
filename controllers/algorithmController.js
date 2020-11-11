const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require("jsonwebtoken");

// Get all algorithms
router.get("/api/algorithm", function (request, response) {
  db.Algorithms.find({}).populate("user")
    .then((algorithms) => {
      response.json(algorithms);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        error: true,
        data: null,
        message: "Failed to get algorithms.",
      });
    });
});

//Get my algorithms
router.get("/api/algorithm/user/:userJwt", function (request, response) {
  // console.log(request.params.userJwt);
  const decoded = jwt.verify(
    request.params.userJwt,
    process.env.SECRET,
    (err, decoded) => {
      if (err) {
        console.log(err);
        return response.status(401).json({
          error: true,
          data: null,
          message: "Invalid token.",
        });
      } else {
        db.Users.findOne({ username: decoded.username }).then((user) => {
          db.Algorithms.find({ userId: user._id })
            .then((algorithms) => {
              response.json(algorithms);
            })
            .catch((error) => {
              console.log(error);
              response.status(500).json({
                error: true,
                data: null,
                message: "Failed to get algorithms.",
              });
            });
        });
      }
    }
  );
});

// Get a specific algorithm
router.get("/api/algorithm/:id", function (request, response) {
  db.Algorithms.findOne({ _id: request.params.id })
    .populate("testCases").populate("user")
    .then((algorithm) => {
      response.json(algorithm);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        error: true,
        data: null,
        message: "Failed to get algorithm.",
      });
    });
});

// Create an algorithm
//TODO: Add user info to algorithm model
router.post("/api/algorithm", (req, res) => {
  const { testCases, algorithm, userJwt } = req.body;
  // console.log(userJwt);
  const decoded = jwt.verify(userJwt, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return response.status(401).json({
        error: true,
        data: null,
        message: "Invalid token.",
      });
    } else {
      // console.log("decoded:" + decoded.username);
      db.Users.findOne({ username: decoded.username })
        .then((user) => {
          // console.log(user._id);
          // first test cases are created from the front end input (can be empty array!)
          db.TestCases.insertMany(testCases)
            .then((testCaseResponse) => {
              // then an algorithm entry is created with the front end input and test cases from db
              db.Algorithms.create({
                challengeName: algorithm.challengeName,
                description: algorithm.description,
                testCases: testCaseResponse,
                userId: user._id,
              }).then((newAlgorithm) => {
                res.status(200).json({
                  error: false,
                  data: newAlgorithm,
                  message: "Successfully posted new algorithm.",
                });
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: true,
                data: null,
                message: "Failed to create algorithm.",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          response.status(500).json({
            error: true,
            data: null,
            message: "Failed to find username.",
          });
        });
    }
  });
});

// Edit an algorithm
router.put("/api/algorithm/:id", function (request, response) {
  response.json({ success: "Edit an algorithm worked!" });
});

// Delete an algorithm
router.delete("/api/algorithm/:id", function (request, response) {
  response.json({ success: "Delete an algorithm worked!" });
});

module.exports = router;
