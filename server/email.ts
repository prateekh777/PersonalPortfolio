import nodemailer from 'nodemailer';
import { z } from 'zod';
import fetch from 'node-fetch';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  recaptchaToken: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    // Skip verification for the test token
    if (token === '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI') {
      // This is a test key that always returns success
      return true;
    }
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
    
    const data = await response.json() as { success: boolean };
    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// For actual production use, you'd want to use an actual SMTP service
// This is set up as a placeholder that logs the email content
export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    // Verify reCAPTCHA if token is provided
    if (data.recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(data.recaptchaToken);
      if (!isValidRecaptcha) {
        console.error('reCAPTCHA verification failed');
        return false;
      }
    }
    
    // In a real production environment, you would set up an actual SMTP service
    // like SendGrid, Mailgun, AWS SES, etc.
    
    // For demonstration purposes, we'll create a test account with Ethereal
    // This is only for development/demo purposes
    const testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    
    // Send email
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <contact@example.com>`,
      to: "prateek@edoflip.com", // Forward to this email
      replyTo: data.email, // Set reply-to as the sender's email
      subject: `New contact form submission from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>From:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<h3>Message:</h3>
<p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    });
    
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}