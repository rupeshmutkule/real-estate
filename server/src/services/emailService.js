const sendEmail = async ({ to, subject, html }) => {
  // Check if Brevo is configured
  if (!process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL) {
    console.log("Brevo not configured - Email would be sent to:", to);
    return {
      success: true,
      messageId: "mock-" + Date.now(),
      note: "Brevo not configured. Configure BREVO_API_KEY in .env to send real emails.",
    };
  }

  try {
    const brevo = require("@getbrevo/brevo");
    const client = new brevo.TransactionalEmailsApi();
    
    client.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );
    
    const email = new brevo.SendSmtpEmail();
    
    email.sender = {
      email: process.env.BREVO_SENDER_EMAIL,
      name: process.env.BREVO_SENDER_NAME || "Real Estate CRM",
    };
    
    email.to = [
      {
        email: to,
      },
    ];
    
    email.subject = subject;
    email.htmlContent = html;
    
    const result = await client.sendTransacEmail(email);
    
    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("Email send error:", error.message);
    throw new Error("Failed to send email: " + error.message);
  }
};

module.exports = {
  sendEmail,
};
