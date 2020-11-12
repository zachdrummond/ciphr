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
  const decoded = jwt.verify(userJwt, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return response.status(401).json({
        error: true,
        data: null,
        message: "Invalid token.",
      });
    } else {
      db.Users.findOne({ username: decoded.username })
        .then((user) => {
          // first test cases are created from the front end input (can be empty array!)
          db.TestCases.insertMany(testCases)
            .then((testCaseResponse) => {
              // then an algorithm entry is created with the front end input and test cases from db
              db.Algorithms.create({
                challengeName: algorithm.challengeName,
                // regex added to preserve line breaks in mongodb
                description: algorithm.description.replace(/(\r\n)/g, "<br>"),
                testCases: testCaseResponse,
                userId: user._id,
              }).then((newAlgorithm) => {
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
                    res.status(500).json({
                      error: true,
                      data: null,
                      message: "Failed to update user.",
                    });
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
  // Restrict updates where the creatorId is equal to the user-provided token _id.
  db.Algorithms.findByIdAndUpdate(
    request.params.id,
    {
      challengeName: request.body.algorithm.challengeName,
      description: request.body.algorithm.description,
    },
    { new: true }
  )
    .then((updated) => {
      console.log(updated);
      if (!updated) {
        response.status(404).json({
          error: true,
          data: null,
          message: "Unable to find that algorithm.",
        });
      } else {
        response.json({
          error: false,
          data: updated,
          message: "Successfully updated algorithm.",
        });
      }
    })
    .catch((err) => {
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
      console.log("Deleted Algorithm");
      db.Users.findByIdAndDelete(request.params.id)
        .then((result) => {
          console.log("Deleted User Algorithm");
          res.status(200).json({
            error: false,
            data: null,
            message: "Successfully deleted algorithm and updated user.",
          });
        })
        .catch((err) => {
          response.status(500).json({
            error: true,
            data: null,
            message: "An error occurred deleting the user's algorithm.",
          });
        });
    })
    .catch((err) => {
      response.status(500).json({
        error: true,
        data: null,
        message: "An error occurred deleting your algorithm.",
      });
    });
});

module.exports = router;
