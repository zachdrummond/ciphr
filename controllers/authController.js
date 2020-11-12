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
  if (!username || !password) {
    response.status(400).json({
      error: true,
      data: null,
      message: "Invalid username/password.",
    }); // Bad Request
  } else {
    // Find a user in the database
    db.Users.findOne({ username: username })
      .then((foundUser) => {
        // If there is a matching user in the database
        if (foundUser) {
          response.status(400).json({
            error: true,
            data: null,
            message: "Username already taken.",
          }); // Bad Request
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
                  // Sends a JWT to the client
                  const token = jwt.sign(
                    { username: newUser.username },
                    process.env.SECRET
                  );
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
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({
          error: true,
          data: null,
          message: "Error finding the user.",
        });
      });
  }
});

// LOGIN ROUTE
router.post("/api/login", (request, response) => {
  // Destructuring the request object
  const { username, password } = request.body;
  // Find a user in the database
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
              const token = jwt.sign(
                { username: foundUser.username },
                process.env.SECRET
              );
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

// Delete a user
router.delete("/api/user/:userJwt", function (request, response) {
  jwt.verify(request.params.userJwt, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return response.status(401).json({
        error: true,
        data: null,
        message: "Invalid token.",
      });
    } else {
      db.Users.findOneAndDelete({
        username: decoded.username,
      })
        .then((user) => {
          db.Algorithms.deleteMany({ userId: user._id })
            .then((deletedAlgorithms) => {
              response.status(200).json({
                error: false,
                data: null,
                message: "Successfully deleted user.",
              });
            })
            .catch((error) => {
              console.log(error);
              response.status(500).json({
                error: true,
                data: null,
                message: "Unable to delete user.",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          response.status(500).json({
            error: true,
            data: null,
            message: "Unable to delete user.",
          });
        });
    }
  });
});

module.exports = router;
