const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../models");

// SIGNUP ROUTE
router.post("/api/signup", (request, response) => {
  // Destructuring the request object
  const { username, password } = request.body;
  // Validation
  if (!username.trim() || !password.trim()) {
    response.status(400); // Bad Request
  } else {
    // Hash the password
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        // Create a new user
        db.Users.create({
          username: username,
          password: hashedPassword,
        })
          .then((newUser) => {
            // Sends a JWT webtoken to the client
            const token = jwt.sign({ username: newUser.username }, process.env.SECRET);
            response.json({
              error: false,
              data: token,
              message: "Successfully signed up.",
            });
          })
          .catch((error) => {
            console.log(error);
            response.status(500).json({
              error: true,
              data: null,
              message: "Unable to sign up",
            });
          });
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({
          error: true,
          data: null,
          message: "Unable to hash password",
        });
      });
  }
});

// LOGIN ROUTE
router.post("/api/login", (request, response) => {
  const { username, password } = request.body;
  // Destructuring the request object
  db.Users.findOne({ username: username })
    .then((foundUser) => {
      // If there is a matching user in the database
      if (foundUser) {
        bcrypt
          .compare(password, foundUser.password)
          .then(function (result) {
            // If the passwords match
            if (result) {
              // Sends a JWT webtoken to the client
              const token = jwt.sign({ username: foundUser.username }, process.env.SECRET);
              response.json({
                error: false,
                data: token,
                message: "Successfully logged in.",
              });
            } else {
              response.status(401).json({
                error: true,
                data: null,
                message: "Password is incorrect.",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            response.status(401).json({
              error: true,
              data: null,
              message: "Password is incorrect.",
            });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        error: true,
        data: null,
        message: "Unable to find user.",
      });
    });
});

module.exports = router;
