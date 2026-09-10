const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
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
    
    subject: String,
    
    content: {
      type: String,
      required: true,
    },
    
    variables: [String],
    
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Template", templateSchema);
