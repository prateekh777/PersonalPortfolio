#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Vercel Deployment Readiness Test${NC}"
echo "================================="
echo

# Check for required files
echo "Checking for required files..."
required_files=(
  "api/index.ts"
  "vercel.json"
  "package.json"
)

all_files_present=true
for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "✅ $file ${GREEN}found${NC}"
  else
    echo -e "❌ $file ${RED}missing${NC}"
    all_files_present=false
  fi
done

echo

# Check for static data files
echo "Checking for static data files..."
data_dir="data-export"
if [ ! -d "$data_dir" ]; then
  mkdir -p "$data_dir"
  echo -e "📂 Created $data_dir directory"
fi

data_files=(
  "projects.json"
  "interests.json"
  "ai-works.json"
)

all_data_present=true
for file in "${data_files[@]}"; do
  data_file="$data_dir/$file"
  if [ -f "$data_file" ]; then
    echo -e "✅ $data_file ${GREEN}found${NC}"
  else
    echo -e "⚠️ $data_file ${YELLOW}missing${NC} - Will be created during extraction"
    all_data_present=false
  fi
done

echo

# Check for environment variables
echo "Checking for required environment variables..."
env_file=".env"

required_env_vars=(
  "SENDGRID_API_KEY"
)

recommended_env_vars=(
  "CONTACT_FROM_EMAIL"
  "CONTACT_TO_EMAIL"
)

optional_env_vars=(
  "RECAPTCHA_SECRET_KEY"
)

if [ -f "$env_file" ]; then
  echo -e "✅ $env_file ${GREEN}found${NC}"
  
  # Check required env vars
  all_required_env_present=true
  for var in "${required_env_vars[@]}"; do
    if grep -q "^$var=" "$env_file"; then
      echo -e "✅ Required: $var ${GREEN}found${NC}"
    else
      echo -e "❌ Required: $var ${RED}missing${NC}"
      all_required_env_present=false
    fi
  done
  
  # Check recommended env vars
  for var in "${recommended_env_vars[@]}"; do
    if grep -q "^$var=" "$env_file"; then
      echo -e "✅ Recommended: $var ${GREEN}found${NC}"
    else
      echo -e "⚠️ Recommended: $var ${YELLOW}missing${NC}"
    fi
  done
  
  # Check optional env vars
  for var in "${optional_env_vars[@]}"; do
    if grep -q "^$var=" "$env_file"; then
      echo -e "✅ Optional: $var ${GREEN}found${NC}"
    else
      echo -e "ℹ️ Optional: $var not found"
    fi
  done
else
  echo -e "❌ $env_file ${RED}missing${NC}"
  all_required_env_present=false
  echo -e "${YELLOW}You will need to set these environment variables in Vercel:${NC}"
  for var in "${required_env_vars[@]}"; do
    echo -e "  - $var ${RED}(Required)${NC}"
  done
  for var in "${recommended_env_vars[@]}"; do
    echo -e "  - $var ${YELLOW}(Recommended)${NC}"
  done
  for var in "${optional_env_vars[@]}"; do
    echo -e "  - $var (Optional)"
  done
fi

echo

# Check vercel.json configuration
echo "Checking vercel.json configuration..."
if [ -f "vercel.json" ]; then
  # Check for routes in vercel.json
  if grep -q "\"routes\"" "vercel.json"; then
    echo -e "✅ Routes configuration ${GREEN}found${NC}"
  else
    echo -e "⚠️ Routes configuration ${YELLOW}missing${NC} - API routes may not work correctly"
  fi
  
  # Check for build configuration
  if grep -q "\"build\"" "vercel.json"; then
    echo -e "✅ Build configuration ${GREEN}found${NC}"
  else
    echo -e "ℹ️ Build configuration not found - will use Vercel defaults"
  fi
fi

echo

# Summary
echo -e "${YELLOW}Deployment Readiness Summary${NC}"
echo "================================="

if $all_files_present && $all_required_env_present; then
  echo -e "${GREEN}✅ Your project is ready for Vercel deployment!${NC}"
else
  echo -e "${YELLOW}⚠️ There are issues to address before deployment:${NC}"
  
  if ! $all_files_present; then
    echo -e "  - ${RED}Missing required files${NC}"
  fi
  
  if ! $all_required_env_present; then
    echo -e "  - ${RED}Missing required environment variables${NC}"
  fi
  
  if ! $all_data_present; then
    echo -e "  - ${YELLOW}Missing data files - run 'bash scripts/run-tests.sh extract' to create them${NC}"
  fi
fi

echo
echo -e "${YELLOW}Next Steps:${NC}"
if ! $all_data_present; then
  echo "1. Run 'bash scripts/run-tests.sh extract' to create static data files"
fi
if ! $all_required_env_present; then
  echo "2. Add missing environment variables to .env (or Vercel dashboard during deployment)"
fi
echo "3. Deploy to Vercel using 'vercel' command or GitHub integration"
echo "4. After deployment, verify API health at https://your-domain.vercel.app/api/health"
echo