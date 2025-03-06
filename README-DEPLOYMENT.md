# Deployment Guide for Portfolio Website

This repository contains a personal portfolio website that can be deployed to Vercel with minimal configuration. This document provides instructions on how to prepare and deploy the application.

## Prerequisites

- Node.js (v14 or higher)
- A Vercel account
- MongoDB database (MongoDB Atlas recommended)
- SendGrid account with API key

## Environment Variables

The following environment variables are required:

- `MONGODB_URI`: Connection string for your MongoDB database
- `SENDGRID_API_KEY`: Your SendGrid API key for sending emails
- `CONTACT_FROM_EMAIL`: Email address to send from (must be verified in SendGrid)
- `CONTACT_TO_EMAIL`: Email address to receive contact form submissions

## Deployment Configuration

The repository includes the following files for Vercel deployment:

- `vercel.json`: Configuration for Vercel build and routing
- `api/index.ts`: Serverless entry point for the API
- `scripts/prepare-vercel-deployment.ts`: Script to verify deployment configuration
- `scripts/test-vercel-deployment.sh`: Script to test deployment setup
- `VERCEL_DEPLOYMENT.md`: Detailed deployment documentation

## Pre-Deployment Checks

Before deploying, run the following commands to verify your setup:

```bash
# Run the deployment preparation script
npx tsx scripts/prepare-vercel-deployment.ts

# Run the deployment test script
./scripts/test-vercel-deployment.sh
```

These scripts will check for required files and environment variables, ensuring your project is ready for deployment.

## Deployment Process

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to your Vercel account:
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

4. Follow the prompts to configure your project and set environment variables.

5. Once deployed, Vercel will provide a URL for your live application.

## Verifying Deployment

After deployment, verify that:

1. The website loads correctly
2. The MongoDB connection works
3. The contact form properly sends emails

## Additional Resources

For more detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) in this repository.

## Testing MongoDB Connection

To test your MongoDB connection before deployment:

```bash
npx tsx scripts/test-mongodb.ts
```

## Testing Email Functionality

To test email sending capabilities:

```bash
# Ensure SENDGRID_API_KEY is set in your environment
npx tsx scripts/test-email.ts
```

## Support

If you encounter any issues with deployment, please refer to the [Vercel documentation](https://vercel.com/docs) or open an issue in this repository.