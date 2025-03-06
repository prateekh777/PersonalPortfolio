#!/bin/bash

echo "Testing Vercel deployment configuration..."

# Check for vercel.json
if [ -f "vercel.json" ]; then
  echo "✅ vercel.json exists"
else
  echo "❌ vercel.json is missing"
  exit 1
fi

# Check for api/index.ts
if [ -f "api/index.ts" ]; then
  echo "✅ api/index.ts exists"
else
  echo "❌ api/index.ts is missing"
  exit 1
fi

# Check for data-export files
if [ -f "data-export/projects.json" ]; then
  echo "✅ data-export/projects.json exists"
else
  echo "❌ data-export/projects.json is missing"
  exit 1
fi

if [ -f "data-export/interests.json" ]; then
  echo "✅ data-export/interests.json exists"
else
  echo "❌ data-export/interests.json is missing"
  exit 1
fi

if [ -f "data-export/ai-works.json" ]; then
  echo "✅ data-export/ai-works.json exists"
else
  echo "❌ data-export/ai-works.json is missing"
  exit 1
fi

# Check for environment variables
if [ -z "$SENDGRID_API_KEY" ]; then
  echo "⚠️ SENDGRID_API_KEY environment variable is not set"
else
  echo "✅ SENDGRID_API_KEY is set"
fi

# Test the API health endpoint
echo -n "Testing API health endpoint..."
HEALTH_RESPONSE=$(curl -s http://localhost:5000/api/health)
if [[ $HEALTH_RESPONSE == *"status"*"ok"* ]]; then
  echo -e "\r✅ Health endpoint is working properly"
else
  echo -e "\r❌ Health endpoint test failed"
  echo "Response: $HEALTH_RESPONSE"
fi

echo "Vercel deployment configuration test complete."
echo ""
echo "To deploy to Vercel:"
echo "1. Install Vercel CLI: npm install -g vercel"
echo "2. Login to Vercel: vercel login"
echo "3. Deploy your project: vercel --prod"
echo ""
echo "Make sure to set up these environment variables in the Vercel dashboard:"
echo "- SENDGRID_API_KEY"
echo "- CONTACT_FROM_EMAIL"
echo "- CONTACT_TO_EMAIL"