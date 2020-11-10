const express = require("express");
const router = express.Router();
const db = require("../models");

// Get all algorithms
router.get("/api/algorithm", function (request, response) {
  // response.json({ success: "Get all algorithms worked!" });
  db.Algorithms.find({})
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

// Get a specific algorithm
router.get("/api/algorithm/:id", function (request, response) {
  // response.json({ success: "Get a single algorithm worked!" });
  db.Algorithms.findOne({_id:request.params.id}).
  populate('testCases')
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
  console.log(req.body);
  const { testCases, algorithm } = req.body;
  // first test cases are created from the front end input (can be empty array!)
  db.TestCases.insertMany(testCases)
    .then((testCaseResponse) => {
      // then an algorithm entry is created with the front end input and test cases from db
      db.Algorithms.create({
        challengeName: algorithm.challengeName,
        description: algorithm.description,
        testCases: testCaseResponse,
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
