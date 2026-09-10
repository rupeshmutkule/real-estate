const express = require("express");
const { sendMessage } = require("../controllers/whatsappController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.post("/send", sendMessage);

module.exports = router;
