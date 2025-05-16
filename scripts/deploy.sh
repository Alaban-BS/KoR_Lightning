#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print status messages
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    print_error "Not in a git repository"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Function to check if there are uncommitted changes
check_changes() {
    if ! git diff-index --quiet HEAD --; then
        print_warning "You have uncommitted changes"
        read -p "Do you want to commit them? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            read -p "Enter commit message: " commit_message
            git add .
            git commit -m "$commit_message"
        else
            print_error "Please commit or stash your changes before deploying"
            exit 1
        fi
    fi
}

# Function to run tests
run_tests() {
    print_status "Running tests..."
    if npm test; then
        print_status "Tests passed successfully"
    else
        print_error "Tests failed"
        exit 1
    fi
}

# Function to build the project
build_project() {
    print_status "Building project..."
    if npm run build; then
        print_status "Build completed successfully"
    else
        print_error "Build failed"
        exit 1
    fi
}

# Function to deploy to Vercel
deploy_to_vercel() {
    print_status "Deploying to Vercel..."
    if vercel --prod; then
        print_status "Deployment completed successfully"
    else
        print_error "Deployment failed"
        exit 1
    fi
}

# Main deployment process
main() {
    print_status "Starting deployment process..."
    
    # Check for uncommitted changes
    check_changes
    
    # Run tests
    run_tests
    
    # Build project
    build_project
    
    # Deploy to Vercel
    deploy_to_vercel
    
    print_status "Deployment process completed successfully!"
}

# Run the main function
main 