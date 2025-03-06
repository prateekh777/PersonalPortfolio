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

# Check if projects endpoint returns data
echo "Checking projects API..."
if curl -s "$URL/api/projects" | grep -E '\[.+\]' > /dev/null; then
  echo "✅ Projects API is working"
else
  echo "❌ Projects API failed"
  exit 1
fi

# Check if interests endpoint returns data
echo "Checking interests API..."
if curl -s "$URL/api/interests" | grep -E '\[.+\]' > /dev/null; then
  echo "✅ Interests API is working"
else
  echo "❌ Interests API failed"
  exit 1
fi

# Check if ai-works endpoint returns data
echo "Checking AI works API..."
if curl -s "$URL/api/ai-works" | grep -E '\[.+\]' > /dev/null; then
  echo "✅ AI works API is working"
else
  echo "❌ AI works API failed"
  exit 1
fi

# Check if case-studies endpoint returns data
echo "Checking case studies API..."
if curl -s "$URL/api/case-studies" | grep -E '\[.+\]' > /dev/null; then
  echo "✅ Case studies API is working"
else
  echo "❌ Case studies API failed"
  exit 1
fi

# Check if contact form endpoint is available
echo "Checking contact API..."
if curl -s -o /dev/null -w "%{http_code}" -X OPTIONS "$URL/api/contact" | grep -E '2[0-9][0-9]' > /dev/null; then
  echo "✅ Contact API endpoint is available"
else
  echo "❌ Contact API endpoint is not available"
  exit 1
fi

# All checks passed
echo ""
echo "✅✅✅ All deployment checks passed! ✅✅✅"
exit 0