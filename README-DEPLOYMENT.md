# Vercel Deployment Guide for Portfolio Website

This guide will walk you through deploying your portfolio website to Vercel, ensuring proper functionality in a serverless environment with email capabilities via SendGrid.

## Prerequisites

Before deploying to Vercel, make sure you have:

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A SendGrid account with API key (sign up at [sendgrid.com](https://sendgrid.com))
3. Node.js installed locally for testing

## Deployment Steps

### 1. Fork or Clone the Repository

If you haven't already, fork or clone this repository to your GitHub account.

### 2. Set Up Environment Variables in Vercel

When setting up your project on Vercel, you'll need to configure the following environment variables:

**Required:**
- `SENDGRID_API_KEY`: Your SendGrid API key

**Recommended:**
- `CONTACT_FROM_EMAIL`: The email that will appear as the sender of contact form emails (must be verified in SendGrid)
- `CONTACT_TO_EMAIL`: The email where you want to receive contact form submissions

**Optional:**
- `RECAPTCHA_SECRET_KEY`: If you're using Google reCAPTCHA for spam protection

### 3. Deploy to Vercel

**Using the Vercel Dashboard:**

1. Log in to the [Vercel dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the environment variables
5. Deploy

**Using the Vercel CLI:**

```bash
# Install Vercel CLI
npm install -g vercel

# Log in to Vercel
vercel login

# Deploy to production
vercel --prod
```

### 4. Verify Deployment

After deployment, verify that everything is working by:

1. Visiting the deployed site
2. Testing the contact form
3. Checking the `/api/health` endpoint to verify the service status

## Key Features

### Static JSON Data

This portfolio uses static JSON files (`data-export/*.json`) to store and serve content:
- `projects.json`: Your project portfolio items
- `interests.json`: Your personal interests
- `ai-works.json`: Your AI-related work

No database is needed as these files are bundled with the deployment.

### SendGrid Email Integration

The contact form uses SendGrid to send emails:
- When users submit the contact form, an email is sent to your specified address
- The SendGrid API key is secured as an environment variable

### API Structure

The API is designed to be lightweight and serverless-friendly:
- `/api/health`: Shows the system status
- `/api/contact`: Processes contact form submissions
- `/api/projects`, `/api/interests`, `/api/ai-works`: Serve static data from JSON files

## Monitoring and Maintenance

### Health Endpoint

The application has a `/api/health` endpoint that provides status information about email service connections. You can use this to monitor the application's health.

Example response:
```json
{
  "status": "ok",
  "timestamp": "2023-09-01T12:00:00Z",
  "uptime": 3600,
  "email": "configured"
}
```

### Troubleshooting

If you encounter issues with the deployment:

1. **Check environment variables** - Make sure all required environment variables are properly set in the Vercel dashboard.
2. **Check logs** - Vercel provides deployment and function logs that can help diagnose issues.
3. **Email service** - Verify that your SendGrid API key is active and the sender email is verified.
4. **Static files** - Ensure the JSON files in `data-export/` are properly formatted.

## Local Development vs. Vercel Deployment

There are a few key differences between local development and Vercel deployment:

1. **Serverless functions** - On Vercel, the API routes run as serverless functions.
2. **Cold starts** - Serverless functions may experience cold starts, causing the first request to be slower.
3. **Environment variables** - Make sure to set the same environment variables in both environments.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [SendGrid API Documentation](https://docs.sendgrid.com/api-reference)

## License

[MIT License](LICENSE)