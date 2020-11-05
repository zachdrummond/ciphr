const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// all test cases represented by input to be tested and output as a result of the code compile
const TestCasesSchema = new Schema({
    input: {
        type: String,
        required: true,
    },
    output: {
        type: String,
        required: true,
    }
})

const TestCases = mongoose.model("TestCases", TestCasesSchema);

module.exports = TestCases;