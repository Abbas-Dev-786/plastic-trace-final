const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics.controller");

router.get("/leaderboard", analyticsController.getLeaderboard);
router.get("/user/:wallet", analyticsController.getUserProfile);
router.get("/qr/:qrId", analyticsController.getQRLifecycle);

module.exports = router;
