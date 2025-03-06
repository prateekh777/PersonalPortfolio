import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// Define the health response type for proper type checking
interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
  email: 'configured' | 'not_configured';
}

/**
 * This script checks the API health endpoint to verify system status
 */
async function checkHealth() {
  try {
    const url = process.env.APP_URL || 'http://localhost:5000';
    console.log(`Checking health at ${url}/api/health`);
    
    const response = await fetch(`${url}/api/health`);
    const data = await response.json() as HealthResponse;
    
    console.log('\nHealth Check Response:');
    console.log(JSON.stringify(data, null, 2));
    
    // Verify system status
    if (data.status === 'ok') {
      console.log('✅ System status: OK');
    } else {
      console.error('❌ System status: FAILED');
    }
    
    // Verify email service configuration
    if (data.email === 'configured') {
      console.log('✅ Email service: OK');
    } else {
      console.error('❌ Email service: NOT CONFIGURED');
    }
    
    console.log(`\nServer time: ${data.timestamp}`);
    console.log(`Uptime: ${data.uptime} seconds`);
    
    if (data.status === 'ok' && data.email === 'configured') {
      console.log('\n✅ All systems operational');
    } else {
      console.error('\n❌ System check failed. Please check the logs above.');
    }
  } catch (error) {
    console.error('Error checking health:', error);
  }
}

checkHealth().catch(console.error);