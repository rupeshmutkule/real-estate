const Campaign = require("../models/Campaign");
const Contact = require("../models/Contact");
const MessageLog = require("../models/MessageLog");
const { launchCampaign } = require("../services/campaignService");

exports.createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);
    
    res.status(201).json({
      success: true,
      campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      campaigns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }
    
    const stats = await MessageLog.aggregate([
      { $match: { campaignId: campaign._id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    
    res.json({
      success: true,
      campaign,
      stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.launchCampaign = async (req, res) => {
  try {
    const { campaignId, contactIds } = req.body;
    
    const contacts = await Contact.find({ _id: { $in: contactIds } });
    
    const campaign = await launchCampaign(campaignId, contacts);
    
    res.json({
      success: true,
      campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
