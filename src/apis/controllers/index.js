import transporter from "../../config/email.config.js";
import dotenv from "dotenv";
dotenv.config();

export const sendContactEmail = async (req, res) => {
  const { name, email, phone, tourInterest, message } = req.body;

  try {
    console.log("Received contact form data:", req.body);
    
    // Send email to the system
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Booking From ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Tour Interest:</strong> ${tourInterest}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>GWINO UREBE URWANDA RWIZA was founded with a simple mission: to share the incredible beauty and rich culture of Rwanda with the world. Our name, which translates to "Come and See Beautiful Rwanda," embodies our commitment to providing authentic and immersive experiences.</p>
        <img src="https://res.cloudinary.com/dzvxnmqnf/image/upload/v1743677395/PHOTO-2025-03-28-13-10-32_x0efmy.jpg" alt="Decalle Ntihinduka, CEO of GWINO UREBE URWANDA RWIZA" style="width: 150px; height: auto; border-radius: 10px; margin-top: 10px;" />
        <p><strong>Decalle Ntihinduka</strong><br>CEO, GWINO UREBE URWANDA RWIZA</p>
        <p><em>"Come and See Beautiful Rwanda!"</em></p>
      `,
    });

    // Send confirmation email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Your Interest in GWINO UREBE URWANDA RWIZA",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for your interest in NGWINO UREBE URWANDA RWIZA. We have received your inquiry and will get back to you soon.</p>
        <p>We are thrilled to have the opportunity to share the beauty of Rwanda with you. Your journey with us will be nothing short of extraordinary.</p>
        <p>Warm regards,</p>
        <p>The GWINO UREBE URWANDA RWIZA Team</p>
        <img src="https://res.cloudinary.com/dzvxnmqnf/image/upload/v1743677395/PHOTO-2025-03-28-13-10-32_x0efmy.jpg" alt="Decalle Ntihinduka, CEO of GWINO UREBE URWANDA RWIZA" style="width: 150px; height: auto; border-radius: 10px; margin-top: 10px;" />
        <p><strong>Decalle Ntihinduka</strong><br>CEO, GWINO UREBE URWANDA RWIZA</p>
        <p><em>"Come and See Beautiful Rwanda!"</em></p>
      `,
    });

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
};
