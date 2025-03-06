# CI/CD Setup for Vercel Deployment

This document outlines how to set up Continuous Integration and Continuous Deployment (CI/CD) for the portfolio website using GitHub Actions and Vercel.

## GitHub Actions + Vercel Integration

### Prerequisites

1. GitHub repository for your project
2. Vercel account linked to your GitHub account
3. Project already deployed manually to Vercel at least once

### Setting Up GitHub Actions

1. Create a `.github/workflows` directory in your repository if it doesn't exist
2. Create a new file `vercel-deploy.yml` with the following content:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Extract data from MongoDB
        if: success()
        run: npm run extract-data
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
          vercel-args: '--prod'
```

### Required Secrets

Add the following secrets to your GitHub repository:

1. `VERCEL_TOKEN`: A Vercel API token (create one in Vercel → Settings → Tokens)
2. `VERCEL_ORG_ID`: Your Vercel Organization ID
3. `VERCEL_PROJECT_ID`: Your Vercel Project ID
4. `MONGODB_URI`: Your MongoDB connection string

To find Vercel IDs:
- Run `vercel whoami` to get your org ID
- Run `vercel projects list` to list projects
- Run `vercel project info` to get project ID

### Preview Deployments for Pull Requests

To enable preview deployments for pull requests, add the following job to your workflow file:

```yaml
  preview:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Extract data from MongoDB
        if: success()
        run: npm run extract-data
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
      
      - name: Deploy to Vercel (Preview)
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
          github-comment: true
```

## Vercel Project Configuration

### Git Integration Settings

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Git Integration"
3. Configure:
   - Production Branch: `main`
   - Enable "Include source files outside of the Root Directory in the Build Step"
   - Set "Ignored Build Step" to: `git diff --quiet HEAD^ HEAD ./ ':(exclude)data-export/'`
     (This prevents rebuilds when only data files change)

### Environment Variables

Make sure all environment variables are properly set in Vercel:
1. `SENDGRID_API_KEY`
2. `CONTACT_FROM_EMAIL`
3. `CONTACT_TO_EMAIL`

For Production and Preview environments, you may want different email addresses.

## Verification and Monitoring

### Post-Deployment Checks

Create a `scripts/verify-deployment.sh` script to verify deployments:

```bash
#!/bin/bash

# Verify deployment
URL=$1
if [ -z "$URL" ]; then
  echo "Usage: $0 <deployment-url>"
  exit 1
fi

echo "Verifying deployment at $URL..."

# Check if site is up
echo "Checking if site is up..."
if curl -s --head --request GET $URL | grep "200 OK" > /dev/null; then
  echo "✅ Site is up"
else
  echo "❌ Site is down"
  exit 1
fi

# Check API health endpoint
echo "Checking API health..."
if curl -s "$URL/api/health" | grep "status" > /dev/null; then
  echo "✅ API is healthy"
else
  echo "❌ API health check failed"
  exit 1
fi

# More checks as needed
echo "All checks passed! ✅"
```

### Monitoring Setup

1. Configure Vercel Analytics in your project settings
2. Set up Slack or email notifications for failed deployments
3. Consider setting up a separate monitoring service like UptimeRobot

## Rollback Strategy

In case of failed deployments:

1. Automatic rollbacks:
   - Add a step to your GitHub Action to verify deployment
   - If verification fails, trigger a rollback to the previous successful deployment

```yaml
- name: Verify Deployment
  run: ./scripts/verify-deployment.sh ${{ steps.deploy.outputs.preview-url || 'https://your-production-url.com' }}
  id: verify

- name: Rollback on Failure
  if: failure() && steps.verify.outcome == 'failure'
  run: vercel rollback --token=${{ secrets.VERCEL_TOKEN }}
```

2. Manual rollbacks:
   - Go to Vercel dashboard
   - Select your project
   - Go to "Deployments" tab
   - Find a previous successful deployment
   - Click the three dots and select "Promote to Production"