const express = require("express");
const router = express.Router();
const db = require("../models");

// SIGNUP ROUTE
router.post("/api/signup", ({ username, password }, response) => {
  // Validation
  if (!username.trim() || !password.trim()) {
    response.status(400); // Bad Request
  } else {
    // Create a new user
    db.Users.create({
      username: username,
      password: password,
    })
      .then((newUser) => {
        response.json(newUser);
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({
          error: true,
          data: null,
          message: "Unable to sign up",
        });
      });
  }
});

// LOGIN ROUTE

module.exports = router;
