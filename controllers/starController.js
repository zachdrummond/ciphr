const express = require("express");
const router = express.Router();
const db = require("../models");

// upon page load of an algorithm liked status is checked
router.get("/api/star/:id/:username", (req, res) => {
  db.Users.findOne({ username: req.params.username })
    .populate("starred")
    .then((user) => {
      // returns a starred status of false unless id is found in the users list of starred algorithms
      let status = false;
      for (const algo of user.starred) {
        if (req.params.id === algo._id.toString()) {
          status = true;
        }
      }
      res.status(200).json({
        error: false,
        data: status,
        message: "Like status retrieved.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to retrieve like status.",
      });
    });
});

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
            res.status(200).json({
              error: false,
              data: userOne,
              message: "Liked!",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: true,
              data: null,
              message: "Unable to add star to user model.",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to find user.",
        });
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
            res.status(200).json({
              error: false,
              data: userTwo,
              message: "disliked!",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: true,
              data: null,
              message: "Unable to delete star from user model.",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to find user.",
        });
      });
  }
});

router.get("/api/solutionsStar/:username", (req, res) => {
  db.Users.findOne({ username: req.params.username })
    .populate("starredSolutions")
    .then((user) => {
      const starredArr = [];
      for (const star of user.starredSolutions) {
        const starred = {
          id: star._id.toString(),
          status: true
        }
        starredArr.push(starred)
      }
      res.status(200).json({
        error: false,
        data: starredArr,
        message: "Like status retrieved.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to retrieve like status.",
      });
    });
});

router.post("/api/solutionsStar/:id", (req, res) => {
  // if solution is starred the star key is incremented, unstarred = decrement
  let starredArr = [];

  if (!req.body.status) {
    db.Solutions.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { stars: 1 } },
      { new: true }
    )
      .then((addResponse) => {
        // solution id is added to user model 'starred' array
        db.Users.findOneAndUpdate(
          { username: req.body.user },
          { $push: { starredSolutions: addResponse } },
          { new: true }
        ).populate("starredSolutions")
          .then((userOne) => {
            for (const star of userOne.starredSolutions) {
              const starred = {
                id: star._id.toString(),
                status: true
              }
              starredArr.push(starred)
            }
            res.status(200).json({
              error: false,
              data: starredArr,
              message: "Liked!",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: true,
              data: null,
              message: "Unable to add star to user model.",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to find user.",
        });
      });
  } else {
    db.Solutions.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { stars: -1 } },
      { new: true }
    )
      .then((deleteResponse) => {
        // algorithm id is removed from user model 'starred' array
        db.Users.findOneAndUpdate(
          { username: req.body.user },
          { $pull: { starredSolutions: deleteResponse._id } },
          { new: true }
        ).populate("starredSolutions")
          .then((userTwo) => {
            for (const star of userTwo.starredSolutions) {
              const starred = {
                id: star._id.toString(),
                status: true
              }
              starredArr.push(starred)
            }
            res.status(200).json({
              error: false,
              data: starredArr,
              message: "disliked!",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: true,
              data: null,
              message: "Unable to delete star from user model.",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to find user.",
        });
      });
  }
});

module.exports = router;
