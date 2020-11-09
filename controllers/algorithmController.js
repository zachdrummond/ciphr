const express = require("express");
const router = express.Router();
const db = require("../models");

// Get all algorithms
router.get("/api/algorithm", function (request, response) {
  response.json({ success: "Get all algorithms worked!" });
});

// Get a specific algorithm
router.get("/api/algorithm/:id", function (request, response) {
  response.json({ success: "Get a single algorithm worked!" });
});

// Create an algorithm
router.post("/api/algorithm", (req, res) => {
  console.log(req.body)
    db.TestCases.insertMany(req.body.testCases).then((testCaseResponse) => {
        res.status(200).json({
            error: false,
            data: testCaseResponse,
            message: "test cases created!"
        })
    })
    // })

//   db.Algorithms.create(req.body)
//     .then((newAlgorithm) => {
//       res.status(200).json({
//         error: false,
//         data: newAlgorithm,
//         message: "Succesfully posted new algorithm",
//       });
//     })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "failed to post algorithm",
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
