const express = require("express");
const router = express.Router();

// Get all algorithms
router.get("/api/algorithm", function (request, response) {
    response.json({ success: "Get all algorithms worked!" });
});

// Get a specific algorithm
router.get("/api/algorithm/:id", function (request, response) {
    response.json({ success: "Get a single algorithm worked!" });
});

// Create an algorithm
router.post("/api/algorithm/:id", function(request, response) {
    response.json({ success: "Create an algorithm worked!" });
});

// Edit an algorithm
router.put("/api/algorithm/:id", function(request, response) {
    response.json({ success: "Edit an algorithm worked!" });
});

// Delete an algorithm
router.delete("/api/algorithm/:id", function(request, response) {
    response.json({ success: "Delete an algorithm worked!" });
});

module.exports = router;