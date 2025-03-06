# Vercel Deployment Guide

This document provides step-by-step instructions for deploying the portfolio website to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. GitHub repository with your portfolio code
3. SendGrid account with API key for email functionality

## Setup Environment Variables in Vercel

Before deploying, you need to set up the following environment variables in your Vercel project:

1. `SENDGRID_API_KEY`: Your SendGrid API key
2. `CONTACT_FROM_EMAIL`: The email address from which emails will be sent (must be verified in SendGrid)
3. `CONTACT_TO_EMAIL`: The email address that will receive contact form submissions

To add these environment variables:

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add each variable with its corresponding value
4. Make sure to set the environment to "Production" (and optionally "Preview" if needed)

## Deployment Steps

### Option 1: Deploy from GitHub

1. Log in to your Vercel account
2. Click "Add New..." and select "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. Log in to Vercel: `vercel login`
3. Navigate to your project directory
4. Run: `vercel`
5. Follow the prompts to configure your deployment

## Post-Deployment Verification

After deployment, verify that:

1. The website is accessible at your Vercel domain
2. All pages load correctly
3. The contact form works and sends emails
4. All API endpoints are functioning

You can run verification tests with:

```bash
# Test API health endpoint
curl https://your-vercel-domain.vercel.app/api/health

# Test contact form (if applicable)
curl -X POST https://your-vercel-domain.vercel.app/api/contact -H "Content-Type: application/json" -d '{"name":"Test User","email":"test@example.com","subject":"Test","message":"This is a test","recaptchaToken":"test-token"}'
```

## Troubleshooting

If you encounter issues during deployment:

1. Check Vercel build logs for errors
2. Verify all environment variables are set correctly
3. Ensure your SendGrid API key has the necessary permissions
4. Check that your sender email is verified in SendGrid

## Monitoring and Analytics

After deployment, you can:

1. Set up Vercel Analytics to track page views and performance
2. Configure custom domains if needed
3. Set up monitoring alerts for downtime or errors

## CI/CD Setup

For continuous deployment:

1. Make sure your GitHub repository is connected to Vercel
2. Each push to the main branch will trigger a new deployment
3. You can configure preview deployments for pull requests

## Data Management

Remember that this deployment uses static JSON files for content:

1. When you need to update content, modify the JSON files in the `data-export` directory
2. Redeploy the application after content changes
3. For more frequent updates, consider implementing a CMS integration