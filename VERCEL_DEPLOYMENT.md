# Deploying to Vercel

This document provides step-by-step instructions for deploying this portfolio website to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. [Node.js](https://nodejs.org) installed (v14.x or later)
3. Vercel CLI installed globally (`npm install -g vercel`)
4. A MongoDB database (e.g., MongoDB Atlas)
5. A SendGrid account with API key

## Pre-deployment Checks

Before deploying, run the following command to verify that your project is properly configured:

```bash
npm run ts-node scripts/prepare-vercel-deployment.ts
```

This script will check for required files and environment variables, ensuring your project is ready for deployment.

## Configuration Files

### vercel.json

This file contains the Vercel-specific configuration for your project. It defines build settings, routes, and environment variables.

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

### api/index.ts

This file serves as the serverless entry point for API routes on Vercel. It adapts the Express application to work in a serverless environment.

## Environment Variables

Set up the following environment variables in the Vercel dashboard:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | The connection string to your MongoDB database |
| `SENDGRID_API_KEY` | Your SendGrid API key for sending emails |
| `CONTACT_FROM_EMAIL` | The email address to send from (must be verified in SendGrid) |
| `CONTACT_TO_EMAIL` | The email address to send contact form submissions to |

## Deployment Steps

1. **Login to Vercel CLI**:
   ```bash
   vercel login
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. During deployment, you'll be asked to:
   - Link to an existing project or create a new one
   - Confirm your deployment settings
   - Set environment variables (if not already set)

4. Once deployment is complete, Vercel will provide a URL to your live application.

## Post-deployment Verification

After deploying, verify that:

1. The website loads correctly
2. MongoDB connections work properly
3. The contact form sends emails successfully

## Troubleshooting Common Issues

### Database Connection Problems

- Ensure your `MONGODB_URI` is correctly set in Vercel environment variables
- Check that your MongoDB Atlas cluster allows connections from any IP (0.0.0.0/0)
- Verify your MongoDB Atlas user has appropriate permissions

### Email Sending Issues

- Confirm your SendGrid API key is valid and properly set
- Ensure your sender email is verified in SendGrid
- Check SendGrid logs for any delivery issues

### Static Asset Loading Problems

- Make sure all static assets use relative paths
- Check that the build process correctly includes all required assets

## Continuous Deployment

Set up continuous deployment by connecting your Git repository to Vercel:

1. Go to your project dashboard on Vercel
2. Navigate to "Git Integration"
3. Connect your GitHub, GitLab, or Bitbucket repository
4. Configure automatic deployments for specific branches

This will trigger a new deployment whenever you push changes to your connected repository.

## Local Testing

To test the Vercel deployment locally:

```bash
vercel dev
```

This command will start a local development environment that mimics the Vercel production environment.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [SendGrid Documentation](https://docs.sendgrid.com/)