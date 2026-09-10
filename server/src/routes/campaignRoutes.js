const express = require("express");
const {
  createCampaign,
  getAllCampaigns,
  getCampaign,
  launchCampaign,
} = require("../controllers/campaignController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.post("/", createCampaign);
router.get("/", getAllCampaigns);
router.get("/:id", getCampaign);
router.post("/launch", launchCampaign);

module.exports = router;
