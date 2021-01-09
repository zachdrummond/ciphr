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
    language: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
})

const Solutions = mongoose.model("Solutions", SolutionsSchema);

module.exports = Solutions;