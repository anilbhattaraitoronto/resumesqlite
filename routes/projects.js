const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render(
    "projects/projectshome",
    { title: "Projects", user: req.session.user },
  );
});

module.exports = router;
