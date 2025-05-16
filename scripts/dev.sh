#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting development environment setup...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js 18.x${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v)
if [[ ${NODE_VERSION:1:2} -lt 18 ]]; then
    echo -e "${YELLOW}Warning: Node.js version should be 18.x or higher${NC}"
fi

# Kill any existing process on port 3000
echo -e "${GREEN}Checking for existing processes on port 3000...${NC}"
npx kill-port 3000 2>/dev/null || true

# Clean up
echo -e "${GREEN}Cleaning up...${NC}"
rm -rf .next
rm -rf node_modules

# Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo -e "${GREEN}Creating .env.local...${NC}"
    echo "NODE_ENV=development" > .env.local
    echo "NEXT_PUBLIC_API_URL=http://localhost:3000/api" >> .env.local
fi

# Start development server
echo -e "${GREEN}Starting development server...${NC}"
echo -e "${YELLOW}The application will be available at http://localhost:3000${NC}"
npm run dev 