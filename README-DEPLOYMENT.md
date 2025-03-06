# Vercel Deployment Guide for Portfolio Website

This guide will walk you through deploying your portfolio website to Vercel, ensuring proper functionality in a serverless environment with email capabilities via SendGrid and MongoDB integration.

## Prerequisites

Before deploying to Vercel, make sure you have:

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A MongoDB Atlas cluster (sign up at [mongodb.com](https://www.mongodb.com/cloud/atlas/register))
3. A SendGrid account with API key (sign up at [sendgrid.com](https://sendgrid.com))
4. Node.js installed locally for testing

## Deployment Steps

### 1. Fork or Clone the Repository

If you haven't already, fork or clone this repository to your GitHub account.

### 2. Set Up Environment Variables in Vercel

When setting up your project on Vercel, you'll need to configure the following environment variables:

**Required:**
- `MONGODB_URI`: Your MongoDB connection string
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
3. Checking the `/api/health` endpoint to verify MongoDB and SendGrid connections

## Monitoring and Maintenance

### Health Endpoint

The application has a `/api/health` endpoint that provides status information about database and email service connections. You can use this to monitor the application's health.

Example response:
```json
{
  "status": "ok",
  "database": "connected",
  "email": "configured",
  "serverTime": "2023-09-01T12:00:00Z"
}
```

### Troubleshooting

If you encounter issues with the deployment:

1. **Check environment variables** - Make sure all required environment variables are properly set in the Vercel dashboard.
2. **Check logs** - Vercel provides deployment and function logs that can help diagnose issues.
3. **Database connection** - Ensure your MongoDB Atlas cluster is running and the connection string is correct.
4. **Email service** - Verify that your SendGrid API key is active and the sender email is verified.

## Local Development vs. Vercel Deployment

There are a few key differences between local development and Vercel deployment:

1. **Serverless functions** - On Vercel, the API routes run as serverless functions.
2. **Cold starts** - Serverless functions may experience cold starts, causing the first request to be slower.
3. **Environment variables** - Make sure to set the same environment variables in both environments.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [SendGrid API Documentation](https://docs.sendgrid.com/api-reference)

## License

[MIT License](LICENSE)