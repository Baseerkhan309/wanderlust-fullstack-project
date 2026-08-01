const express = require("express");
const router = express.Router(); // out own router
const aiController = require("../controllers/ai");

router.get("/test", aiController.generateDescription);

module.exports = router;