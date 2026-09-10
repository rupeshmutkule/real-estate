const Campaign = require("../models/Campaign");
const MessageLog = require("../models/MessageLog");
const { sendWhatsAppMessage } = require("../services/whatsappService");
const { sendEmail } = require("../services/emailService");

const replacePlaceholders = (template, contact) => {
  let message = template;
  message = message.replace(/\{\{name\}\}/g, contact.name || "");
  message = message.replace(/\{\{property\}\}/g, contact.property || "");
  message = message.replace(/\{\{city\}\}/g, contact.city || "");
  message = message.replace(/\{\{phone\}\}/g, contact.phone || "");
  message = message.replace(/\{\{email\}\}/g, contact.email || "");
  return message;
};

const launchCampaign = async (campaignId, contacts) => {
  const campaign = await Campaign.findById(campaignId);
  
  if (!campaign) {
    throw new Error("Campaign not found");
  }
  
  campaign.status = "running";
  campaign.totalRecipients = contacts.length;
  campaign.startedAt = new Date();
  await campaign.save();
  
  // Send messages directly without queue
  for (const contact of contacts) {
    const message = replacePlaceholders(campaign.message, contact);
    const recipient = campaign.channel === "whatsapp" ? contact.phone : contact.email;
    
    const messageLog = await MessageLog.create({
      contactId: contact._id,
      campaignId: campaign._id,
      channel: campaign.channel,
      recipient,
      message,
      status: "queued",
    });
    
    try {
      if (campaign.channel === "whatsapp") {
        await sendWhatsAppMessage({ to: recipient, message });
      } else if (campaign.channel === "email") {
        await sendEmail({ 
          to: recipient, 
          subject: campaign.name || "Update from Real Estate",
          html: message 
        });
      }
      
      messageLog.status = "sent";
      await messageLog.save();
    } catch (error) {
      messageLog.status = "failed";
      messageLog.error = error.message;
      await messageLog.save();
    }
  }
  
  campaign.status = "completed";
  campaign.completedAt = new Date();
  await campaign.save();
  
  return campaign;
};

module.exports = {
  replacePlaceholders,
  launchCampaign,
};
