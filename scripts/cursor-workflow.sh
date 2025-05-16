#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
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

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Function to check if we're in a git repository
check_git() {
    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
        print_error "Not in a git repository"
        exit 1
    fi
}

# Function to check for uncommitted changes
check_changes() {
    if ! git diff-index --quiet HEAD --; then
        print_warning "You have uncommitted changes"
        read -p "Do you want to commit them? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            read -p "Enter commit message: " commit_message
            git add .
            git commit -m "$commit_message"
            print_status "Changes committed successfully"
        else
            print_warning "Changes not committed"
        fi
    else
        print_status "No uncommitted changes"
    fi
}

# Function to open CodeSandbox
open_codesandbox() {
    print_info "Opening CodeSandbox..."
    # Get the repository URL
    REPO_URL=$(git config --get remote.origin.url)
    # Convert SSH URL to HTTPS if necessary
    if [[ $REPO_URL == git@* ]]; then
        REPO_URL=${REPO_URL/git@/https://}
        REPO_URL=${REPO_URL/:/\/}
    fi
    # Remove .git suffix if present
    REPO_URL=${REPO_URL%.git}
    # Open in default browser
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "https://codesandbox.io/s/github${REPO_URL#*github.com}"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "https://codesandbox.io/s/github${REPO_URL#*github.com}"
    elif [[ "$OSTYPE" == "msys" ]]; then
        start "https://codesandbox.io/s/github${REPO_URL#*github.com}"
    else
        print_error "Unsupported OS"
        exit 1
    fi
}

# Function to check Vercel deployment
check_vercel() {
    print_info "Checking Vercel deployment..."
    if command -v vercel &> /dev/null; then
        vercel ls
    else
        print_warning "Vercel CLI not installed. Please install it with: npm i -g vercel"
    fi
}

# Function to show help
show_help() {
    echo "Cursor to CodeSandbox to Vercel Workflow Helper"
    echo
    echo "Usage: ./cursor-workflow.sh [command]"
    echo
    echo "Commands:"
    echo "  check     Check for uncommitted changes"
    echo "  sandbox   Open CodeSandbox"
    echo "  vercel    Check Vercel deployment"
    echo "  help      Show this help message"
    echo
    echo "Examples:"
    echo "  ./cursor-workflow.sh check"
    echo "  ./cursor-workflow.sh sandbox"
    echo "  ./cursor-workflow.sh vercel"
}

# Main function
main() {
    check_git

    case "$1" in
        "check")
            check_changes
            ;;
        "sandbox")
            open_codesandbox
            ;;
        "vercel")
            check_vercel
            ;;
        "help"|"")
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run the main function
main "$@" 