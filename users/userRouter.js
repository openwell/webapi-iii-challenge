const express = require("express");
const db = require("./userDb");
const db2 = require("../posts/postDb")

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  try {
    db.insert(req.body).then(data => {
      return res.status(201).json({
        data: data
      });
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  try {
    db2.insert({user_id: req.user, text: req.body.text}).then(data => {
      return res.status(201).json({
        data: data
      });
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/", (req, res) => {
  try {
    db.get(req.body).then(data => {
      return res.status(200).json({
        data: data
      });
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/:id", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {
  try {
    db.remove(req.user).then(data => {
      return res.status(200).json({
        data: data
      });
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  try {
    db.update(req.user, req.body).then(data => {
      return res.status(200).json({
        data: data
      });
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return res.status(400).json({
      message: "invalid user id"
    });
  }
  try {
    db.getById(id).then(data => {
      if (data === undefined || data.length === 0) {
        return res.status(400).json({
          message: "invalid user id"
        });
      }
      req.user = id;
      next();
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!req.body) {
    return res.status(400).json({
      message: "missing user data"
    });
  } else if (!name) {
    return res.status(400).json({
      message: "missing required name field"
    });
  }
  next();
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!req.body) {
    return res.status(400).json({
      message: "missing user data"
    });
  } else if (!text) {
    return res.status(400).json({
      message: "missing required text field"
    });
  }
  next();
}

module.exports = router;
