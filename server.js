require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// const jwt = require("express-jwt");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));
app.use(cookieParser());
app.use(require("./controllers/algorithmController.js"));
app.use(require("./controllers/authController.js"));
app.use(require("./controllers/codeController"));
app.use(require("./controllers/starController"));
app.use(require("./controllers/solutionsController"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/algorithmsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (error) => {
  console.log("Mongoose connection error:", error);
});

app.get("/api/config", (request, response) => {
  response.json({ success: true });
});

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
