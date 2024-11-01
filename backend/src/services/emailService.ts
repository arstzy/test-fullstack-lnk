import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  debug: true
});

export const sendEmail = async (from: string, to: string, subject: string, text: string) => {
  const mailOptions = {
    from,
    to,
    subject,
    text
  };

  try {
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", to);
    console.log("Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("Detailed error:", error);
    throw new Error("Error sending email");
  }
};