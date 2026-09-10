const axios = require("axios");

const sendWhatsAppMessage = async ({ to, message }) => {
  // Check if WASender is configured
  if (!process.env.WASENDER_API_URL || !process.env.WASENDER_API_KEY) {
    console.log("WASender not configured - WhatsApp would be sent to:", to);
    return {
      success: true,
      messageId: "mock-" + Date.now(),
      note: "WASender not configured. Configure WASENDER_API_URL and WASENDER_API_KEY in .env to send real messages.",
    };
  }

  try {
    const response = await axios.post(
      process.env.WASENDER_API_URL,
      {
        phone: to,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WASENDER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    return {
      success: true,
      messageId: response.data.messageId || response.data.id,
    };
  } catch (error) {
    console.error("WASender API error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || "Failed to send WhatsApp message");
  }
};

module.exports = {
  sendWhatsAppMessage,
};
