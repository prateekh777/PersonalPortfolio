#!/bin/bash

# Terminal colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo "📊 Testing deployment readiness for Vercel..."
echo

# 1. Check for required files
echo "🔍 Checking for required files..."
required_files=(
  "vercel.json"
  "api/index.ts"
  "data-export/projects.json"
  "data-export/interests.json"
  "data-export/ai-works.json"
)

all_files_exist=true

for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file exists"
  else
    echo -e "${RED}✗${NC} $file is missing"
    all_files_exist=false
  fi
done

if [ "$all_files_exist" = false ]; then
  echo -e "\n${RED}Error:${NC} Some required files are missing. Please create them before deploying."
  exit 1
fi

echo -e "${GREEN}All required files exist!${NC}"
echo

# 2. Validate JSON files
echo "🔍 Validating JSON files..."
json_files=(
  "data-export/projects.json"
  "data-export/interests.json"
  "data-export/ai-works.json"
)

all_json_valid=true

for file in "${json_files[@]}"; do
  if jq empty "$file" 2>/dev/null; then
    echo -e "${GREEN}✓${NC} $file is valid JSON"
  else
    echo -e "${RED}✗${NC} $file contains invalid JSON"
    all_json_valid=false
  fi
done

if [ "$all_json_valid" = false ]; then
  echo -e "\n${RED}Error:${NC} Some JSON files are invalid. Please fix them before deploying."
  exit 1
fi

echo -e "${GREEN}All JSON files are valid!${NC}"
echo

# 3. Check for environment variables
echo "🔍 Checking for required environment variables..."
required_env_vars=(
  "SENDGRID_API_KEY"
)

recommended_env_vars=(
  "CONTACT_FROM_EMAIL"
  "CONTACT_TO_EMAIL"
)

all_required_vars_exist=true

for var in "${required_env_vars[@]}"; do
  if [ -n "${!var}" ]; then
    echo -e "${GREEN}✓${NC} $var is set"
  else
    echo -e "${RED}✗${NC} $var is not set"
    all_required_vars_exist=false
  fi
done

for var in "${recommended_env_vars[@]}"; do
  if [ -n "${!var}" ]; then
    echo -e "${GREEN}✓${NC} $var is set"
  else
    echo -e "${YELLOW}!${NC} $var is not set (recommended)"
  fi
done

if [ "$all_required_vars_exist" = false ]; then
  echo -e "\n${RED}Error:${NC} Some required environment variables are missing. Please set them before deploying."
  echo "You can set these in your Vercel project settings or in a .env file for local testing."
  exit 1
fi

echo -e "${GREEN}All required environment variables are set!${NC}"
echo

# 4. Test local build
echo "🔍 Testing local build..."
if npm run build; then
  echo -e "${GREEN}✓${NC} Build successful"
else
  echo -e "${RED}✗${NC} Build failed"
  echo -e "\n${RED}Error:${NC} The build failed. Please fix any build errors before deploying."
  exit 1
fi

echo

# 5. Final check
echo -e "${GREEN}✅ All checks passed! Your project is ready for Vercel deployment.${NC}"
echo
echo "To deploy to Vercel, run the following commands:"
echo "  vercel login"
echo "  vercel --prod"
echo
echo "Or deploy through the Vercel dashboard: https://vercel.com/new"
echo