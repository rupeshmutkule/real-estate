const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    
    channel: {
      type: String,
      enum: ["whatsapp", "email"],
      required: true,
    },
    
    message: {
      type: String,
      required: true,
    },
    
    totalRecipients: {
      type: Number,
      default: 0,
    },
    
    status: {
      type: String,
      enum: [
        "draft",
        "queued",
        "running",
        "completed",
        "failed",
      ],
      default: "draft",
    },
    
    startedAt: Date,
    
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Campaign", campaignSchema);
