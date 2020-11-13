const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/api/star/:id", (req, res) => {
  // if algorithm is starred the star key is incremented, unstarred = decrement
  if (!req.body.status) {
    db.Algorithms.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { stars: 1 } },
      { new: true }
    )
      .then((addResponse) => {
        // algorithm id is added to user model 'starred' array
        db.Users.findOneAndUpdate(
          { username: req.body.user },
          { $push: { starred: addResponse } },
          { new: true }
        )
          .then((userOne) => {
            console.log(userOne);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    db.Algorithms.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { stars: -1 } },
      { new: true }
    )
      .then((deleteResponse) => {
        // algorithm id is removed from user model 'starred' array
        db.Users.updateOne(
          { username: req.body.user },
          { $pull: { starred: deleteResponse._id } },
          { new: true }
        )
          .then((userTwo) => {
            console.log(userTwo);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = router;
