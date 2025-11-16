const express = require("express");
const router = express.Router();
const qrController = require("../controllers/qr.controller");

router.post("/generate", qrController.generateQRCodes); // ✅
router.post("/assign", qrController.assignQR); // 📄
router.post("/metadata", qrController.uploadMetadata); // 📄
router.post("/scan", qrController.scanQR);
router.post("/verify", qrController.verifyScan);
router.post("/recycle", qrController.markRecycled);
router.post("/distribute", qrController.distributeRewards);

router.get("/all", qrController.getAllQrCodes); // ✅
router.get("/stats", qrController.getQrCodeStats); // ✅

router.get("/stats/:address", qrController.getQrCodeStatsUser); // ✅

module.exports = router;
