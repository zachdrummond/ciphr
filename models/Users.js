const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// username, password, and date of account creation
const UsersSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;