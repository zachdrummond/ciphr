const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require("jsonwebtoken");

// Get all algorithms
router.get("/api/algorithm", function (request, response) {
  db.Algorithms.find({})
    .populate("user")
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
  jwt.verify(request.params.userJwt, process.env.SECRET, (error, decoded) => {
    if (error) {
      console.log(error);
      return response.status(401).json({
        error: true,
        data: null,
        message: "Invalid token.",
      });
    } else {
      db.Users.findOne({ username: decoded.username })
        .then((user) => {
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
        })
        .catch((error) => {
          console.log(error);
          response.status(500).json({
            error: true,
            data: null,
            message: "Failed to get user.",
          });
        });
    }
  });
});

// Get a specific algorithm
router.get("/api/algorithm/:id", function (request, response) {
  db.Algorithms.findOne({ _id: request.params.id })
    .populate("testCases")
    .populate("user")
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
router.post("/api/algorithm", (req, res) => {
  const { testCases, algorithm, userJwt } = req.body;
  jwt.verify(userJwt, process.env.SECRET, (error, decoded) => {
    if (error) {
      console.log(error);
      return response.status(401).json({
        error: true,
        data: null,
        message: "Invalid token.",
      });
    } else {
      db.Users.findOne({ username: decoded.username })
        .then((user) => {
          // algorithm entry is created with the front end name/description and test cases
          db.Algorithms.create({
            challengeName: algorithm.challengeName,
            // regex added to preserve line breaks in mongodb
            description: algorithm.description.replace(/(\r\n)/g, "<br>"),
            hashtags: algorithm.hashtags,
            testCases: testCases,
            userId: user._id,
          })
            .then((newAlgorithm) => {
              user
                .updateOne(
                  { $push: { algorithms: newAlgorithm._id } },
                  { new: true }
                )
                .then((updatedUser) => {
                  res.status(200).json({
                    error: false,
                    data: newAlgorithm,
                    message: "Successfully added algorithm and updated user.",
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).json({
                    error: true,
                    data: null,
                    message: "Failed to update user.",
                  });
                });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({
                error: true,
                data: null,
                message: "Failed to create algorithm.",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            error: true,
            data: null,
            message: "Failed to find user.",
          });
        });
    }
  });
});

// Edit an algorithm
router.put("/api/algorithm/:id", function (request, response) {
  // updates the challenge name and description of the Algorithm document
  const { algorithm, testCases } = request.body;
  db.Algorithms.findByIdAndUpdate(
    request.params.id,
    {
      challengeName: algorithm.challengeName,
      description: algorithm.description,
    },
    { new: true }
  )
    .then((updated) => {
      // updates the test cases associated with the model
      updated
        .updateOne({ $set: { testCases: testCases } }, { new: true })
        .then((updatedTest) => {
          response.status(200).json({
            error: false,
            data: updatedTest,
            message: "Successfully updated algorithm and test.",
          });
        })
        .catch((error) => {
          console.log(error);
          response.status(500).json({
            error: true,
            data: null,
            message: "Unable to update test cases.",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        error: true,
        data: null,
        message: "An error occurred updating your algorithm.",
      });
    });
});

// Delete an algorithm
router.delete("/api/algorithm/:id", function (request, response) {
  db.Algorithms.findByIdAndDelete(request.params.id)
    .then((result) => {
      db.Users.updateOne({ $pull: { algorithms: request.params.id } })
        .then((result) => {
          res.status(200).json({
            error: false,
            data: null,
            message: "Successfully deleted algorithm and updated user.",
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
