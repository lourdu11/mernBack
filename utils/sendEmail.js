const nodemailer = require('nodemailer');

const createTransporter = () =>
    nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

const sendLeadNotification = async (lead) => {
    if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your_email@gmail.com') {
        console.log('📧 [Mock Email] Lead notification for:', lead.email);
        return;
    }
    try {
        const transporter = createTransporter();
        await transporter.sendMail({
            from: `"Sprouts Orgs Bot" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `🆕 New Lead: ${lead.name} - ${lead.service}`,
            html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
          <h2 style="color:#4f46e5">New Lead Received!</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td><strong>Name</strong></td><td>${lead.name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${lead.email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${lead.phone}</td></tr>
            <tr><td><strong>Service</strong></td><td>${lead.service}</td></tr>
            <tr><td><strong>Budget</strong></td><td>${lead.budget || 'N/A'}</td></tr>
            <tr><td><strong>Timeline</strong></td><td>${lead.timeline || 'N/A'}</td></tr>
            <tr><td><strong>Message</strong></td><td>${lead.message || 'N/A'}</td></tr>
          </table>
          <p style="color:#6b7280;font-size:12px;margin-top:16px;">— Sprouts Orgs CRM</p>
        </div>
      `,
        });
    } catch (err) {
        console.error('Email send failed:', err.message);
    }
};

const sendLeadConfirmation = async (lead) => {
    if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your_email@gmail.com') return;
    try {
        const transporter = createTransporter();
        await transporter.sendMail({
            from: `"Sprouts Orgs" <${process.env.SMTP_USER}>`,
            to: lead.email,
            subject: 'Thanks for reaching out to Sprouts Orgs!',
            html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
          <h2 style="color:#4f46e5">Hello ${lead.name},</h2>
          <p>Thank you for your interest in <strong>${lead.service}</strong>. Our team will get back to you within 24 hours.</p>
          <p>In the meantime, feel free to WhatsApp us or browse our portfolio.</p>
          <a href="https://wa.me/919999999999" style="display:inline-block;background:#25D366;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;margin-top:12px;">Chat on WhatsApp</a>
          <p style="color:#6b7280;font-size:12px;margin-top:24px;">— Sprouts Orgs Team</p>
        </div>
      `,
        });
    } catch (err) {
        console.error('Confirmation email failed:', err.message);
    }
};

module.exports = { sendLeadNotification, sendLeadConfirmation };
