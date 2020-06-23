const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render(
    "blogs/blogshome",
    { title: "Latest Blogs", user: req.session.user },
  );
});

module.exports = router;
