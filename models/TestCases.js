const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// all test cases represented by input to be tested and output as a result of the code compile
// test cases are optional
const TestCasesSchema = new Schema({
    input: {
        type: String,
    },
    output: {
        type: String,
    }
})

const TestCases = mongoose.model("TestCases", TestCasesSchema);

module.exports = TestCases;