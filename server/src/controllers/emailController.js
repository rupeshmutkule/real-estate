const Contact = require("../models/Contact");
const MessageLog = require("../models/MessageLog");
const { sendEmail } = require("../services/emailService");

exports.sendEmail = async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    
    if (!email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Email, subject, and message are required",
      });
    }
    
    const result = await sendEmail({
      to: email,
      subject,
      html: message,
    });
    
    let contact = await Contact.findOne({ email });
    if (!contact) {
      contact = await Contact.create({ email });
    }
    
    await MessageLog.create({
      contactId: contact._id,
      channel: "email",
      recipient: email,
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
