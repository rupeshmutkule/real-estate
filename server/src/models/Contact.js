const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    
    phone: {
      type: String,
      trim: true,
      index: true,
    },
    
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    
    property: String,
    
    city: String,
    
    tags: [String],
    
    whatsappOptIn: {
      type: Boolean,
      default: false,
    },
    
    emailOptIn: {
      type: Boolean,
      default: false,
    },
    
    whatsappOptOut: {
      type: Boolean,
      default: false,
    },
    
    emailOptOut: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
