const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("skills", { title: "Skills", user: req.session.user });
});

module.exports = router;
