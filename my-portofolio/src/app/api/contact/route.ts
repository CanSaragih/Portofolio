import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: "canwhardana@gmail.com",
        pass: "YOUR_APP_PASSWORD", // You need to generate an App Password from Google
      },
    });

    // Email content
    const mailOptions = {
      from: "canwhardana@gmail.com",
      to: "canwhardana@gmail.com",
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Message from Portfolio Website</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h3 style="color: #1e293b; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #334155;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #f1f5f9; border-radius: 8px;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              This message was sent from your portfolio website contact form.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
