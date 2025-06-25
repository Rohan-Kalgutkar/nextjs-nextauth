import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //Configure mail for usage

    const hashedtoken = await bcryptjs.hash(userId.toString(), 10); // Hashing userId for security, if needed

    // const action =
    //   emailType === "VERIFY" ? "verify your email" : "reset your password";
    // const path = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
    // const link = `${process.env.DOMAIN}/${path}?token=${hashedtoken}`;

    // const htmlContent = `
    //   <p>
    //     Click <a href="${link}">here</a> to ${action}, or copy and paste the link below into your browser:<br><br>
    //     ${link}
    //   </p>
    // `;

    if (emailType === "VERIFY") {
      const updatedUser=await User.findByIdAndUpdate(userId, {
        $set:{
        verifyToken: hashedtoken,
        verifyTokenExpiry: Date.now() + 3600000,
      }
      }); // 1 hour expiry);

      console.log("Updated user for verify:",updatedUser)
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set:{
        forgotPasswordToken: hashedtoken,
        forgotPasswordExpiry: Date.now() + 3600000,
      }
      }); // 1 hour expiry);
    }

    // const transporter = nodemailer.createTransport({
    //     host: "smtp.example.com",
    //     port: 587,
    //     secure: false, // upgrade later with STARTTLS
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASS,
    //     },
    //   });

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ba91557c76636b", // Wrong ❌
        pass: "bd5b4241d5841f", //Wrong ❌
      },
    });

    const mailOptions = {
      from: "rohan@rohan.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password", // Subject line
      // text: "Hello world?", // plain text body
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email:" : "reset your password"
      } 
      or copy and paste the link below in your browser
      <br>${process.env.DOMAIN}/verifyemail?token=${hashedtoken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};
