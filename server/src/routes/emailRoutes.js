const express = require("express");
const { sendEmail } = require("../controllers/emailController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.post("/send", sendEmail);

module.exports = router;
