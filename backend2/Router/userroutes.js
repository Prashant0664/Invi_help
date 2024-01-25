const express = require("express");
const router = express.Router();

router.post("/signup", require("../Controller/signup"));
module.exports = router;