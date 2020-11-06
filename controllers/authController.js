const express = require("express");
const router = express.Router();
const db = require("../models");

// SIGNUP ROUTE
router.post("/api/signup", (request, response) => {
    if(!request.body.username.trim() || !request.body.password.trim()) {
        response.status(400); // Bad Request
    }
})

// LOGIN ROUTE


module.exports = router;