const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render(
    "education",
    { title: "Educational Qualifications", user: req.session.user },
  );
});

module.exports = router;
