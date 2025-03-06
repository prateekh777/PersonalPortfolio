#!/bin/bash

# Portfolio Website Test Suite
# This script runs various tests for the portfolio website application

# Set text colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print header
echo -e "${YELLOW}Portfolio Website Deployment Test Suite"
echo -e "${NC}===================================="

# Function to run a specific test
run_test() {
  test_name=$1
  
  echo -e "\n${YELLOW}Running: $test_name"
  echo -e "${NC}------------------------------------"
  
  case "$test_name" in
    "MongoDB Connection")
      # Test MongoDB connection
      if [ -z "$MONGODB_URI" ]; then
        echo -e "${RED}MONGODB_URI environment variable not set${NC}"
        echo "Please set the MONGODB_URI environment variable in your .env file"
        return 1
      fi
      
      # Run the MongoDB connection test script
      tsx scripts/test-mongodb.ts
      if [ $? -eq 0 ]; then
        echo -e "\n${GREEN}Test completed: $test_name${NC}"
        return 0
      else
        echo -e "\n${RED}Test failed: $test_name${NC}"
        return 1
      fi
      ;;
      
    "SendGrid Email Test")
      # Test SendGrid email functionality
      if [ -z "$SENDGRID_API_KEY" ]; then
        echo -e "${RED}SENDGRID_API_KEY environment variable not set${NC}"
        echo "Please set the SENDGRID_API_KEY environment variable in your .env file"
        return 1
      fi
      
      echo "SendGrid API key configured successfully"
      
      # Run the email test script
      tsx scripts/test-email.ts
      if [ $? -eq 0 ]; then
        echo -e "\n${GREEN}Test completed: $test_name${NC}"
        return 0
      else
        echo -e "\n${RED}Test failed: $test_name${NC}"
        return 1
      fi
      ;;
      
    "Data Export")
      # Test data export to static JSON files
      if [ -z "$MONGODB_URI" ]; then
        echo -e "${RED}MONGODB_URI environment variable not set${NC}"
        echo "Please set the MONGODB_URI environment variable in your .env file"
        return 1
      fi
      
      # Run the data extraction script
      tsx scripts/extract-data-for-frontend.ts
      
      # Check if JSON files were created
      if [ -f "data-export/projects.json" ] && [ -f "data-export/interests.json" ] && [ -f "data-export/ai-works.json" ] && [ -f "data-export/case-studies.json" ]; then
        echo -e "\n✅ Data export successful"
        echo -e "✅ JSON files created in data-export directory"
        echo -e "\n${GREEN}Test completed: $test_name${NC}"
        return 0
      else
        echo -e "\n${RED}Test failed: $test_name${NC}"
        echo "Some JSON files were not created"
        return 1
      fi
      ;;
      
    "API Endpoints")
      # Test API endpoints
      
      # Start server in background
      echo "Starting server..."
      tsx server/index.ts &
      SERVER_PID=$!
      
      # Wait for server to start
      sleep 5
      
      # Test health endpoint
      echo "Testing /api/health endpoint..."
      HEALTH_RESPONSE=$(curl -s http://localhost:5000/api/health)
      if [[ $HEALTH_RESPONSE == *"status"* ]]; then
        echo "✅ Health endpoint working"
      else
        echo "❌ Health endpoint not working"
        kill $SERVER_PID
        return 1
      fi
      
      # Test projects endpoint
      echo "Testing /api/projects endpoint..."
      PROJECTS_RESPONSE=$(curl -s http://localhost:5000/api/projects)
      if [[ $PROJECTS_RESPONSE == \[* ]]; then
        echo "✅ Projects endpoint working"
      else
        echo "❌ Projects endpoint not working"
        kill $SERVER_PID
        return 1
      fi
      
      # Test interests endpoint
      echo "Testing /api/interests endpoint..."
      INTERESTS_RESPONSE=$(curl -s http://localhost:5000/api/interests)
      if [[ $INTERESTS_RESPONSE == \[* ]]; then
        echo "✅ Interests endpoint working"
      else
        echo "❌ Interests endpoint not working"
        kill $SERVER_PID
        return 1
      fi
      
      # Test ai-works endpoint
      echo "Testing /api/ai-works endpoint..."
      AI_WORKS_RESPONSE=$(curl -s http://localhost:5000/api/ai-works)
      if [[ $AI_WORKS_RESPONSE == \[* ]]; then
        echo "✅ AI works endpoint working"
      else
        echo "❌ AI works endpoint not working"
        kill $SERVER_PID
        return 1
      fi
      
      # Test case-studies endpoint
      echo "Testing /api/case-studies endpoint..."
      CASE_STUDIES_RESPONSE=$(curl -s http://localhost:5000/api/case-studies)
      if [[ $CASE_STUDIES_RESPONSE == \[* ]]; then
        echo "✅ Case studies endpoint working"
      else
        echo "❌ Case studies endpoint not working"
        kill $SERVER_PID
        return 1
      fi
      
      # Kill server process
      kill $SERVER_PID
      
      echo -e "\n${GREEN}Test completed: $test_name${NC}"
      return 0
      ;;
      
    "Deployment Readiness")
      # Check if the project is ready for deployment
      
      # Check for required files
      echo "Checking for required files..."
      
      REQUIRED_FILES=(
        "vercel.json"
        "api/index.ts"
        "data-export/projects.json"
        "data-export/interests.json"
        "data-export/ai-works.json"
        "data-export/case-studies.json"
      )
      
      ALL_FILES_EXIST=true
      
      for file in "${REQUIRED_FILES[@]}"; do
        if [ -f "$file" ]; then
          echo "✅ $file exists"
        else
          echo "❌ $file is missing"
          ALL_FILES_EXIST=false
        fi
      done
      
      if [ "$ALL_FILES_EXIST" = false ]; then
        echo -e "\n${RED}Some required files are missing${NC}"
        return 1
      fi
      
      # Check for required environment variables
      echo -e "\nChecking for required environment variables..."
      
      if [ -n "$SENDGRID_API_KEY" ]; then
        echo "✅ SENDGRID_API_KEY is set"
      else
        echo "❌ SENDGRID_API_KEY is missing"
        return 1
      fi
      
      echo -e "\n${GREEN}Project is ready for deployment${NC}"
      echo -e "\n${GREEN}Test completed: $test_name${NC}"
      return 0
      ;;
      
    *)
      echo "Unknown test: $test_name"
      return 1
      ;;
  esac
}

# Parse command-line arguments
if [ $# -eq 0 ]; then
  # No arguments, run all tests
  TESTS=("MongoDB Connection" "SendGrid Email Test" "Data Export" "API Endpoints" "Deployment Readiness")
else
  # Run specific test
  case "$1" in
    "mongo") TESTS=("MongoDB Connection");;
    "email") TESTS=("SendGrid Email Test");;
    "data") TESTS=("Data Export");;
    "api") TESTS=("API Endpoints");;
    "deploy") TESTS=("Deployment Readiness");;
    "all") TESTS=("MongoDB Connection" "SendGrid Email Test" "Data Export" "API Endpoints" "Deployment Readiness");;
    *) 
      echo "Unknown test: $1"
      echo "Available tests: mongo, email, data, api, deploy, all"
      exit 1
      ;;
  esac
fi

# Run the selected tests
FAILED_TESTS=0

for test in "${TESTS[@]}"; do
  run_test "$test"
  if [ $? -ne 0 ]; then
    FAILED_TESTS=$((FAILED_TESTS + 1))
  fi
  echo -e "====================================\n"
done

# Print summary
echo "Tests completed!"
if [ $FAILED_TESTS -gt 0 ]; then
  echo -e "${RED}$FAILED_TESTS test(s) failed${NC}"
  exit 1
else
  exit 0
fi