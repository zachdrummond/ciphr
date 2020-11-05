const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlgorithmsSchema = new Schema({
  challengeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  testCases: [
    {
      type: Schema.Types.ObjectId,
      ref: "TestCases",
    },
  ],
});
