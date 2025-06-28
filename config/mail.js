import nodemailer from 'nodemailer';
import { SMTP_PASS, SMTP_USER } from "./env.js";


// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

// send the mail
export const sendOtpEmail = async (email, role, password) => {
    try {
        const info = await transporter.sendMail({
            from: SMTP_USER, // sender address
            to: email, // list of receivers
           subject: "🎉 User Account Created Successfully!",

text: `Hello,

Your user account with the email ${email} has been successfully created.
You have registered as a ${role}.
Your login password is: ${password}

If you did not sign up for this account, please ignore this email or contact support.`,

html: `<div style="font-family: Arial, sans-serif; color: #222; background: #f9f9f9; padding: 24px; border-radius: 8px; line-height: 1.6;">
  <h2 style="color: #2d7ff9;">✅ Your Account Has Been Created</h2>

  <p style="font-size: 16px;">
    👋 Hello,
  </p>

  <p style="font-size: 16px;">
    Your account associated with the email 
    <b style="color: #2d7ff9;">${email}</b> has been successfully created.
  </p>

  <p style="font-size: 16px;">
    🛡️ You registered as: 
    <b style="color: #2d7ff9;">${role}</b>
  </p>

  <p style="font-size: 16px;">
    🔐 Your password: 
    <code style="background: #eaeaea; padding: 4px 8px; border-radius: 4px; font-family: monospace; color: #d63384;">${password}</code>
  </p>

  <p style="font-size: 14px; color: #888; margin-top: 24px;">
    ⚠️ If you did not sign up for this account, please ignore this email or contact our support team.
  </p>
</div>`
, 
        });
        // log the mesage id in the console
        console.log("Message sent: %s", info.messageId);

        // preview the generated URL for the email
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error("Error while sending mail", error);
    }
}