const mongoose = require("mongoose");

const messageLogSchema = new mongoose.Schema(
  {
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
    
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },
    
    channel: {
      type: String,
      enum: ["whatsapp", "email"],
      required: true,
    },
    
    recipient: {
      type: String,
      required: true,
    },
    
    message: String,
    
    status: {
      type: String,
      enum: [
        "queued",
        "sent",
        "delivered",
        "read",
        "failed",
      ],
      default: "queued",
    },
    
    providerMessageId: String,
    
    error: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MessageLog", messageLogSchema);
