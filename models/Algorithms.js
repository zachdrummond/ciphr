const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// mongoDB schema to store algorithm info
const AlgorithmsSchema = new Schema({
  challengeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // an array of possible test cases for the algorithm
  testCases: [
    {
      type: Schema.Types.ObjectId,
      ref: "TestCases",
    },
  ],
});

const Algorithms = mongoose.model("Algorithms", AlgorithmsSchema);

module.exports = Algorithms;