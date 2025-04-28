const twilio = require('twilio');

// Twilio credentials
const accountSid = 'ACeec88105c080eea72e948b4e22c83f42';
const authToken = '7e0cc7095d6913a7e3b8712a953f6421';
const twilioNumber = '+14155238886';

const client = twilio(accountSid, authToken);

const sendWhatsApp = async (to, body) => {
    await client.messages.create({
        body: body,
        from: `whatsapp:${twilioNumber}`,
        to: `whatsapp:${to}`
      })
  
}
module.exports = { sendWhatsApp }
