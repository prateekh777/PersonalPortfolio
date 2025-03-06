# Portfolio Website Deployment Guide

This guide provides instructions for deploying the portfolio website to Vercel.

## Project Overview

The portfolio website is a React/TypeScript application with an Express backend, configured to work as a serverless application on Vercel. The website displays the portfolio content from static JSON files located in the `data-export` directory.

## Deployment Requirements

Before deployment, ensure you have:

1. A Vercel account
2. A SendGrid account with API key for email functionality
3. The static data JSON files in the `data-export` directory

## Environment Variables

The following environment variables must be set in your Vercel project:

- `SENDGRID_API_KEY`: Your SendGrid API key
- `CONTACT_FROM_EMAIL`: The email address from which contact form emails will be sent
- `CONTACT_TO_EMAIL`: The email address that will receive contact form submissions

## Deployment Steps

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Deploy the project:
   ```
   vercel
   ```

4. Follow the prompts to configure the project.

5. To deploy to production:
   ```
   vercel --prod
   ```

### Option 2: Using GitHub Integration

1. Push your code to a GitHub repository
2. Link the repository to Vercel
3. Configure the build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Set the environment variables
5. Deploy the project

## Vercel Configuration

The project includes a `vercel.json` file with the following configuration:

- Routing for API endpoints to the serverless functions
- Configuration for static file serving
- Memory and duration limits for serverless functions
- Environment variable references

## Post-Deployment Verification

After deployment, verify that:

1. The website loads correctly
2. The API endpoints return data
3. The contact form works properly

You can use the `scripts/verify-deployment.sh` script to check if your deployment is working:

```
./scripts/verify-deployment.sh https://your-vercel-domain.vercel.app
```

## Updating Content

To update the website content:

1. Update the JSON files in the `data-export` directory
2. Redeploy the application

For a more dynamic content management system, consider integrating with a headless CMS.

## Important Notes

- The serverless function for the API has a memory limit of 1024MB and a max execution time of 10 seconds.
- Static assets are served from the `public` directory.
- The application is configured to use client-side routing for all non-API routes.

## Troubleshooting

If you encounter issues with the deployment:

1. Check the Vercel deployment logs
2. Verify that all environment variables are set correctly
3. Ensure that the API endpoints are functioning properly
4. Check that the static JSON files are present in the `data-export` directory

## Support

For additional help with deployment, refer to:

- [Vercel Documentation](https://vercel.com/docs)
- [SendGrid Documentation](https://docs.sendgrid.com/)