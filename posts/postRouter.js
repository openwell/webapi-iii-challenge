const express = require("express");
const db = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  if (!id || !isNaN(id)) {
    return res.status(400).json({
      message: "invalid post id"
    });
  }
  try {
    db.getById(id).then(data => {
      if (data.length === 0) {
        return res.status(400).json({
          message: "invalid post id"
        });
      }
      req.postId = id;
      next();
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = router;
