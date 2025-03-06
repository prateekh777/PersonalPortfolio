# Deployment Guide

This guide provides instructions for deploying this portfolio website to production.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Deployment to Vercel](#deployment-to-vercel)
4. [Environment Variables](#environment-variables)
5. [Data Management](#data-management)
6. [Testing](#testing)
7. [Monitoring](#monitoring)
8. [Troubleshooting](#troubleshooting)

## Overview

This portfolio website is designed to be deployed to Vercel as a serverless application. The application uses a static data approach with JSON files for content management, making it highly scalable and cost-effective.

### Key Features

- **Static Data Files**: Projects, case studies, AI works, and interests are stored as JSON files.
- **Serverless API Routes**: All API endpoints are implemented as serverless functions.
- **Email Integration**: Contact form uses SendGrid for reliable email delivery.
- **Health Monitoring**: Built-in health check endpoint for monitoring.

## Prerequisites

Before deploying, make sure you have:

1. A Vercel account (Sign up at [https://vercel.com](https://vercel.com))
2. A SendGrid account with an API key (Sign up at [https://sendgrid.com](https://sendgrid.com))
3. Git repository access (e.g., GitHub, GitLab, or Bitbucket)

## Deployment to Vercel

For detailed Vercel-specific deployment instructions, refer to [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).

### Quick Start

1. **Prepare your data**
   ```bash
   # Extract data from MongoDB to static JSON files
   npx tsx scripts/extract-data-for-frontend.ts
   ```

2. **Verify application health**
   ```bash
   # Test all aspects of the application
   bash scripts/run-tests.sh all
   ```

3. **Deploy to Vercel**
   - Push your code to your Git repository
   - Connect your repository to Vercel
   - Configure build settings and environment variables
   - Deploy

## Environment Variables

The following environment variables must be set in your production environment:

| Variable | Required | Description |
|----------|----------|-------------|
| `SENDGRID_API_KEY` | Yes | Your SendGrid API key for sending emails |
| `CONTACT_FROM_EMAIL` | Recommended | The email address used as the sender |
| `CONTACT_TO_EMAIL` | Recommended | The email address where form submissions are sent |
| `RECAPTCHA_SECRET_KEY` | Optional | For reCAPTCHA spam protection on the contact form |

## Data Management

### Static Data Files

All content is stored in static JSON files located in the `data-export` directory:

- `projects.json`: Portfolio projects
- `case-studies.json`: Professional case studies
- `ai-works.json`: AI-related work
- `interests.json`: Personal interests and hobbies

### Updating Content

To update content after deployment:

1. Modify the JSON files locally
2. Test changes with `bash scripts/run-tests.sh all`
3. Deploy updated files to Vercel

For MongoDB users, you can extract updated data using:
```bash
npx tsx scripts/extract-data-for-frontend.ts
```

## Testing

### Built-in Test Scripts

The application includes several test scripts to verify functionality:

```bash
# Run all tests
bash scripts/run-tests.sh all

# Test specific components
bash scripts/run-tests.sh health    # API health check
bash scripts/run-tests.sh email     # Email functionality
bash scripts/run-tests.sh vercel    # Deployment readiness
bash scripts/run-tests.sh extract   # Data extraction
```

### Manual Testing

After deployment, verify:

1. The website loads correctly at your Vercel URL
2. All pages render correctly
3. The contact form works properly
4. API endpoints return correct data

## Monitoring

### Health Check Endpoint

The application includes a health check endpoint at `/api/health` that returns:

```json
{
  "status": "ok",
  "timestamp": "2023-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "email": "configured"
}
```

Use this endpoint with monitoring services like UptimeRobot, Pingdom, or StatusCake.

### Logging

Vercel provides built-in logging for serverless functions. Access logs via the Vercel dashboard.

## Troubleshooting

### Common Issues

1. **Missing environment variables**
   - Verify all required environment variables are set in Vercel

2. **Email delivery issues**
   - Check SendGrid API key is valid
   - Verify sender email is verified in SendGrid

3. **Static data not showing**
   - Ensure JSON files exist in the `data-export` directory
   - Check file permissions and format

### Getting Support

For Vercel deployment issues, refer to [Vercel Documentation](https://vercel.com/docs).
For SendGrid issues, refer to [SendGrid Documentation](https://docs.sendgrid.com/).

---

For additional Vercel-specific deployment details, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)