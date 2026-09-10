const Contact = require("../models/Contact");
const MessageLog = require("../models/MessageLog");
const { sendWhatsAppMessage } = require("../services/whatsappService");

exports.sendMessage = async (req, res) => {
  try {
    const { phone, message } = req.body;
    
    if (!phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Phone and message are required",
      });
    }
    
    const result = await sendWhatsAppMessage({
      to: phone,
      message,
    });
    
    let contact = await Contact.findOne({ phone });
    if (!contact) {
      contact = await Contact.create({ phone });
    }
    
    await MessageLog.create({
      contactId: contact._id,
      channel: "whatsapp",
      recipient: phone,
      message,
      status: "sent",
      providerMessageId: result.messageId,
    });
    
    res.json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
