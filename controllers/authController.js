const express = require("express");
const router = express.Router();
const db = require("../models");

// SIGNUP ROUTE
router.post("/api/signup", (request, response) => {
    if(!request.body.username.trim() || !request.body.password.trim()) {
        response.status(400); // Bad Request
    } else {
        db.Users.create({
            username: request.body.username,
            password: request.body.password
        });
    }
})

// LOGIN ROUTE


module.exports = router;