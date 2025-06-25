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
export const sendOtpEmail = async (email, role) => {
    try {
        const info = await transporter.sendMail({
            from: SMTP_USER, // sender address
            to: email, // list of receivers
            subject: "User Account Verified", // Subject line
text: `Your user account with the email ${email} has been successfully verified. You have registered as a ${role}.`, // plain text body
html: `<div style="font-family: Arial, sans-serif; color: #222; background: #f9f9f9; padding: 24px; border-radius: 8px;">
  <h2 style="color: #2d7ff9;">Your User Account Has Been Verified</h2>
  <p style="font-size: 16px;">
    Hello, your account associated with the email 
    <b style="color: #2d7ff9;">${email}</b> has been successfully verified.
  </p>
  <p style="font-size: 16px;">
    You have registered as a 
    <b style="color: #2d7ff9;">${role}</b>.
  </p>
  <p style="font-size: 14px; color: #888;">
    If you did not sign up for this account, please ignore this email or contact support.
  </p>
</div>`
, // html body
        });
        // log the mesage id in the console
        console.log("Message sent: %s", info.messageId);

        // preview the generated URL for the email
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail", err);
    }
}