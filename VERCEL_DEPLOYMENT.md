# Vercel Deployment Guide

This guide provides detailed instructions for deploying this portfolio website to Vercel as a serverless application.

## Prerequisites

Before deploying to Vercel, make sure you have:

1. A Vercel account ([Sign up here](https://vercel.com/signup))
2. A SendGrid account with an API key ([Sign up here](https://sendgrid.com/))
3. (Optional) A verified sender email in SendGrid for production use

## Step 1: Prepare Your Project

1. **Test the application locally**
   ```bash
   # Run the development server
   npm run dev
   
   # Test the API health endpoint
   bash scripts/run-tests.sh health
   
   # Verify email functionality 
   bash scripts/run-tests.sh email
   ```

2. **Create static JSON data files**
   
   All data for the portfolio is stored in static JSON files in the `data-export` directory:
   - `projects.json`
   - `interests.json`
   - `ai-works.json`
   
   If you have existing MongoDB data, you can extract it using:
   ```bash
   bash scripts/run-tests.sh extract
   ```

3. **Check Vercel deployment readiness**
   ```bash
   bash scripts/run-tests.sh vercel
   ```

## Step 2: Install and Configure Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Log in to Vercel**
   ```bash
   vercel login
   ```

## Step 3: Deploy to Vercel

### Option 1: Deploy using Vercel CLI

1. **Initial deployment**
   ```bash
   vercel
   ```
   This will guide you through an interactive setup process.

2. **Production deployment**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy from the Vercel Dashboard

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure settings (see "Environment Variables" section below)
5. Click "Deploy"

## Environment Variables

Set the following environment variables in your Vercel project settings:

| Variable | Required | Description |
|----------|----------|-------------|
| `SENDGRID_API_KEY` | Yes | Your SendGrid API key for sending emails |
| `CONTACT_FROM_EMAIL` | Recommended | The verified email address to send emails from |
| `CONTACT_TO_EMAIL` | Recommended | The email address where you want to receive contact form messages |
| `RECAPTCHA_SECRET_KEY` | Optional | Secret key for Google reCAPTCHA if you're using it to protect the contact form |

## Project Structure for Vercel

The project is structured to work seamlessly with Vercel:

- `api/index.ts` - The serverless API entry point
- `vercel.json` - Configuration for routing and builds
- `data-export/*.json` - Static data files
- `dist/public/` - Built frontend assets

## Monitoring Your Deployment

After deployment, you can monitor your site:

1. **Check API health**
   
   Visit `https://your-domain.vercel.app/api/health` to verify the API status.

2. **View deployment logs**
   
   Check logs in the Vercel dashboard under your project's "Deployments" tab.

## Troubleshooting

### Common Issues

1. **Cold Start Delays**
   
   Serverless functions may experience "cold starts" where the first request after a period of inactivity takes longer to respond. This is normal behavior.

2. **Environment Variables**
   
   If you're experiencing issues with email functionality, verify your environment variables are correctly set in the Vercel dashboard.

3. **Build Failures**
   
   If your deployment fails to build, check the build logs in the Vercel dashboard for specific error messages.

### Getting Help

If you encounter issues not covered here, refer to:

- [Vercel Documentation](https://vercel.com/docs)
- [SendGrid Documentation](https://docs.sendgrid.com/)

## Updating Your Deployment

To update your site after making changes:

1. Push changes to your GitHub repository if using GitHub integration
2. Or deploy again using `vercel --prod` from the CLI

## Cost Considerations

Vercel's Hobby tier is free and includes:

- Unlimited personal projects
- Serverless functions with limits on execution time
- Basic analytics

For more resources or removing usage limits, consider upgrading to a Pro plan.