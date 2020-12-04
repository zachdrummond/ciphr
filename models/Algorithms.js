const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// mongoDB schema to store algorithm info
const AlgorithmsSchema = new Schema(
  {
    challengeName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    hashtags: {
      type: Array,
      required: true,
    },
    stars: {
      type: Number,
      default: 0,
    },
    // an array of possible test cases for the algorithm
    testCases: [
      {
        input: String,
        output: String,
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true } }
);
AlgorithmsSchema.virtual("user", {
  ref: "Users",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

const Algorithms = mongoose.model("Algorithms", AlgorithmsSchema);

module.exports = Algorithms;
