const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestCasesSchema = new Schema({
    standardIn: {
        type: String,
        required: true,
    },
    standardOut: {
        type: String,
        required: true,
    }
})

const TestCases = mongoose.model("TestCases", TestCasesSchema);

module.exports = TestCases;