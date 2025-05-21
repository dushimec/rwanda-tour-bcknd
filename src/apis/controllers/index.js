import transporter from "../../config/email.config.js";
import dotenv from "dotenv";
dotenv.config();

export const sendContactEmail = async (req, res) => {
  const { name, email, phone, tourInterest, message } = req.body;
  if (!name || !email || !phone || !tourInterest || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    console.log("Received contact form data:", req.body);
    const emailStyles = `
      body {
        font-family: 'Segoe UI', Arial, sans-serif;
        background: #f9fafb;
        color: #22223b;
        margin: 0;
        padding: 0;
      }
      .container {
        background: #fff;
        max-width: 600px;
        margin: 30px auto;
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(34,34,59,0.08);
        padding: 32px 28px;
      }
      .header {
        text-align: center;
        padding-bottom: 18px;
        border-bottom: 1px solid #e9ecef;
      }
      .header img {
        width: 90px;
        border-radius: 50%;
        margin-bottom: 10px;
      }
      .title {
        font-size: 1.6rem;
        color: #2a9d8f;
        margin: 0 0 8px 0;
        font-weight: 700;
      }
      .subtitle {
        font-size: 1.1rem;
        color: #264653;
        margin-bottom: 0;
      }
      .content {
        margin: 24px 0;
        font-size: 1.05rem;
        line-height: 1.7;
      }
      .info-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 18px;
      }
      .info-table td {
        padding: 7px 0;
        vertical-align: top;
      }
      .info-label {
        color: #2a9d8f;
        font-weight: 600;
        width: 140px;
      }
      .footer {
        text-align: center;
        color: #888;
        font-size: 0.98rem;
        margin-top: 28px;
        border-top: 1px solid #e9ecef;
        padding-top: 16px;
      }
      .quote {
        font-style: italic;
        color: #e76f51;
        margin: 18px 0 0 0;
        font-size: 1.1rem;
      }
    `;

    const adminEmailHtml = `
      <html>
        <head>
          <style>${emailStyles}</style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://res.cloudinary.com/dzvxnmqnf/image/upload/v1743677395/PHOTO-2025-03-28-13-10-32_x0efmy.jpg" alt="Decalle Ntihinduka, CEO" />
              <div class="title">New Booking Inquiry</div>
              <div class="subtitle">GWINO UREBE URWANDA RWIZA</div>
            </div>
            <div class="content">
              <table class="info-table">
                <tr>
                  <td class="info-label">Name:</td>
                  <td>${name}</td>
                </tr>
                <tr>
                  <td class="info-label">Email:</td>
                  <td>${email}</td>
                </tr>
                <tr>
                  <td class="info-label">Phone:</td>
                  <td>${phone}</td>
                </tr>
                <tr>
                  <td class="info-label">Tour Interest:</td>
                  <td>${tourInterest}</td>
                </tr>
                <tr>
                  <td class="info-label">Message:</td>
                  <td>${message}</td>
                </tr>
              </table>
              <p>
                NGWINO UREBE URWANDA RWIZA was founded with a simple mission: to share the incredible beauty and rich culture of Rwanda with the world. Our name, which translates to "Come and See Beautiful Rwanda," embodies our commitment to providing authentic and immersive experiences.
              </p>
            </div>
            <div class="footer">
              <strong>Decalle Ntihinduka</strong><br>
              CEO, GWINO UREBE URWANDA RWIZA
              <div class="quote">"Come and See Beautiful Rwanda!"</div>
            </div>
          </div>
        </body>
      </html>
    `;

    const userEmailHtml = `
      <html>
        <head>
          <style>${emailStyles}</style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://res.cloudinary.com/dzvxnmqnf/image/upload/v1743677395/PHOTO-2025-03-28-13-10-32_x0efmy.jpg" alt="Decalle Ntihinduka, CEO" />
              <div class="title">Thank You for Your Inquiry</div>
              <div class="subtitle">GWINO UREBE URWANDA RWIZA</div>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>
                Thank you for your interest in GWINO UREBE URWANDA RWIZA. We have received your inquiry and will get back to you soon.
              </p>
              <p>
                We are thrilled to have the opportunity to share the beauty of Rwanda with you. Your journey with us will be nothing short of extraordinary.
              </p>
            </div>
            <div class="footer">
              <strong>Decalle Ntihinduka</strong><br>
              CEO, GWINO UREBE URWANDA RWIZA
              <div class="quote">"Come and See Beautiful Rwanda!"</div>
            </div>
          </div>
        </body>
      </html>
    `;
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
