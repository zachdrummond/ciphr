const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SolutionsSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
})

const Solutions = mongoose.model("Solutions", SolutionsSchema);

module.exports = Solutions;