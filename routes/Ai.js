const express = require("express");
const router = express.Router(); // out own router
const aiController = require("../controllers/ai");

router.post("/test", aiController.generateDescription);

module.exports = router;