import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

/**
 * This script tests SendGrid email functionality by sending a test email
 */
async function testSendGridEmail() {
  console.log('Testing SendGrid email functionality...');
  
  // Check for SendGrid API key
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  if (!sendgridApiKey) {
    console.error('Error: SENDGRID_API_KEY environment variable is not set.');
    console.log('Please set this environment variable and try again.');
    process.exit(1);
  }
  
  // Set SendGrid API key
  sgMail.setApiKey(sendgridApiKey);
  
  // Get email addresses
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'prateek@edoflip.com';
  const toEmail = process.env.CONTACT_TO_EMAIL || 'prateek@edoflip.com';
  
  console.log(`From: ${fromEmail}`);
  console.log(`To: ${toEmail}`);
  
  // Create test email
  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: 'SendGrid Test Email',
    text: 'This is a test email sent from the Portfolio Application using SendGrid.',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #333;">SendGrid Test Email</h2>
        <p>This is a test email sent from the Portfolio Application using SendGrid.</p>
        <p>If you're receiving this email, it means your SendGrid integration is working correctly!</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated test email. Please do not reply.</p>
      </div>
    `,
  };
  
  try {
    // Send the email
    const response = await sgMail.send(msg);
    console.log('Test email sent successfully!');
    console.log(`Status code: ${response[0].statusCode}`);
    console.log('SendGrid integration is working correctly.');
  } catch (error) {
    console.error('Error sending test email:');
    console.error(error);
    
    // Check for SendGrid error response
    if (error.response) {
      console.error('SendGrid API error response:');
      console.error(error.response.body);
    }
    
    process.exit(1);
  }
}

testSendGridEmail().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});