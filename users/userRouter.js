const express = "express";
const db = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  if (!id || !isNaN(id)) {
    res.status(400).json({
      message: "invalid user id"
    });
  }
  try {
    db.getById(id).then(data => {
      if (data.length === 0) {
        return res.status(400).json({
          message: "invalid user id"
        });
      }
      next()
    });
  } catch (err) {
    res.status(500).send(err);
  }
  next();
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
