import dotenv from 'dotenv';
import { sendContactEmail } from '../server/email';

// Load environment variables
dotenv.config();

/**
 * This script tests SendGrid email functionality by sending a test email
 */
async function testSendGridEmail() {
  console.log('Testing SendGrid email functionality...');
  
  // Check if SendGrid API key is configured
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  if (!sendgridApiKey) {
    console.error('ERROR: SENDGRID_API_KEY environment variable not set');
    console.log('Please set the SENDGRID_API_KEY environment variable in your .env file');
    process.exit(1);
  }
  
  console.log('✅ SendGrid API key found');
  
  // Get from and to email addresses
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'noreply@example.com';
  const toEmail = process.env.CONTACT_TO_EMAIL || 'recipient@example.com';
  
  console.log(`Sending test email:`);
  console.log(`- From: ${fromEmail}`);
  console.log(`- To: ${toEmail}`);
  
  // Create test email data
  const testData = {
    name: 'Test User',
    email: fromEmail,
    subject: 'Test Email from Portfolio Website',
    message: 'This is a test email sent from the portfolio website to verify SendGrid integration.',
    recaptchaToken: 'test-token'
  };
  
  try {
    // Send test email
    const result = await sendContactEmail(testData);
    
    if (result) {
      console.log('✅ Test email sent successfully!');
      console.log('Email functionality is working correctly.');
    } else {
      console.error('❌ Failed to send test email.');
      console.log('Check your SendGrid configuration and try again.');
    }
  } catch (error) {
    console.error('❌ Error sending test email:', error);
    console.log('Make sure your SendGrid API key is valid and your sender email is verified in SendGrid.');
  }
}

// Run the test
testSendGridEmail();