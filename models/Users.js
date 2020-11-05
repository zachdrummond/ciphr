const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// username, password, and date of account creation as well as associated algorithms
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
    },
    // an array of posted algorithms
    algorithms: [
        {
          type: Schema.Types.ObjectId,
          ref: "Algorithms",
        },
      ],
})

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;