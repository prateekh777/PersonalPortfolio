#!/bin/bash

# Terminal colors
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Portfolio Website Deployment Test Suite${NC}"
echo "===================================="
echo

# Function to run a test with proper formatting
run_test() {
  local script=$1
  local description=$2
  
  echo -e "${YELLOW}Running: ${description}${NC}"
  echo "------------------------------------"
  
  if [[ $script == *.ts ]]; then
    tsx $script
  else
    bash $script
  fi
  
  echo
  echo -e "${GREEN}Test completed: ${description}${NC}"
  echo "===================================="
  echo
}

# Test email functionality
if [[ "$1" == "email" || "$1" == "all" ]]; then
  run_test "scripts/test-email.ts" "SendGrid Email Test"
fi

# Test API health
if [[ "$1" == "health" || "$1" == "all" ]]; then
  run_test "scripts/check-health.ts" "API Health Check"
fi

# Test Vercel deployment readiness
if [[ "$1" == "vercel" || "$1" == "all" ]]; then
  run_test "scripts/test-vercel-deployment.sh" "Vercel Deployment Readiness"
fi

# Extract data for static files
if [[ "$1" == "extract" || "$1" == "all" ]]; then
  run_test "scripts/extract-data-for-frontend.ts" "Extract Data for Frontend"
fi

# If no arguments provided, show usage
if [[ $# -eq 0 ]]; then
  echo "Usage: bash scripts/run-tests.sh [test-type]"
  echo
  echo "Available test types:"
  echo "  email   - Test SendGrid email functionality"
  echo "  health  - Test API health endpoints"
  echo "  vercel  - Test Vercel deployment readiness"
  echo "  extract - Extract data from MongoDB to JSON files"
  echo "  all     - Run all tests"
  echo
fi

echo "Tests completed!"