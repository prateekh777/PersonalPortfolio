#!/bin/bash

# Terminal colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

if [ -z "$1" ]; then
  echo -e "${YELLOW}Usage: $0 <vercel-deployment-url>${NC}"
  echo "Example: $0 https://my-portfolio.vercel.app"
  exit 1
fi

DEPLOYMENT_URL=$1
API_URL="${DEPLOYMENT_URL}/api"

echo -e "${YELLOW}Vercel Deployment Verification${NC}"
echo "===================================="
echo

# Check if the URL is reachable
echo "Checking if deployment URL is reachable..."
if curl -s --head "${DEPLOYMENT_URL}" | grep "200 OK" > /dev/null; then
  echo -e "✅ Frontend deployed at ${GREEN}${DEPLOYMENT_URL}${NC}"
else
  echo -e "❌ Frontend ${RED}not accessible${NC} at ${DEPLOYMENT_URL}"
fi

echo

# Check health endpoint
echo "Checking API health endpoint..."
HEALTH_RESPONSE=$(curl -s "${API_URL}/health")

if [ -n "$HEALTH_RESPONSE" ]; then
  echo -e "✅ Health endpoint ${GREEN}accessible${NC}"
  echo "Health Response:"
  echo "$HEALTH_RESPONSE" | json_pp
  
  # Extract status from health response
  STATUS=$(echo "$HEALTH_RESPONSE" | grep -o '"status":"[^"]*"' | cut -d':' -f2 | tr -d '"')
  if [ "$STATUS" = "ok" ]; then
    echo -e "✅ API status: ${GREEN}OK${NC}"
  else
    echo -e "❌ API status: ${RED}NOT OK${NC}"
  fi
  
  # Extract email config status from health response
  EMAIL_STATUS=$(echo "$HEALTH_RESPONSE" | grep -o '"email":"[^"]*"' | cut -d':' -f2 | tr -d '"')
  if [ "$EMAIL_STATUS" = "configured" ]; then
    echo -e "✅ Email service: ${GREEN}Configured${NC}"
  else
    echo -e "❌ Email service: ${RED}Not Configured${NC}"
  fi
else
  echo -e "❌ Health endpoint ${RED}not accessible${NC}"
fi

echo

# Check API endpoints
echo "Checking API endpoints..."
endpoints=(
  "projects"
  "case-studies"
  "ai-works"
  "interests"
)

for endpoint in "${endpoints[@]}"; do
  response=$(curl -s "${API_URL}/${endpoint}")
  if [[ "$response" == "["* ]] || [[ "$response" == "{"* ]]; then
    # Looks like valid JSON
    item_count=$(echo "$response" | grep -o '\{' | wc -l)
    echo -e "✅ ${endpoint}: ${GREEN}Working${NC} (${item_count} items)"
  else
    echo -e "❌ ${endpoint}: ${RED}Not working${NC}"
  fi
done

echo

# Summary
echo -e "${YELLOW}Deployment Verification Summary${NC}"
echo "===================================="
echo -e "${GREEN}Frontend URL:${NC} ${DEPLOYMENT_URL}"
echo -e "${GREEN}API URL:${NC} ${API_URL}"
echo
echo "To monitor application health, set up a regular check to:"
echo "${API_URL}/health"
echo
echo "For any issues, check the deployment logs in the Vercel dashboard."