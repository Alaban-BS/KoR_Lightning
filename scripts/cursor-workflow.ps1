# Simple workflow commands for Cursor

# Function to show status with colors
function Write-Status {
    param($Message, $Type = "Info")
    $Colors = @{
        "Info" = "Green"
        "Warning" = "Yellow"
        "Error" = "Red"
    }
    Write-Host "[$Type] $Message" -ForegroundColor $Colors[$Type]
}

# Function to check git status
function Test-GitStatus {
    if (-not (git rev-parse --is-inside-work-tree 2>$null)) {
        Write-Status "Not in a git repository" "Error"
        return
    }
    
    $status = git status --porcelain
    if ($status) {
        Write-Status "You have uncommitted changes:" "Warning"
        git status
    } else {
        Write-Status "No uncommitted changes" "Info"
    }
}

# Function to open CodeSandbox
function Open-CodeSandbox {
    $repoUrl = git config --get remote.origin.url
    if (-not $repoUrl) {
        Write-Status "No remote repository found" "Error"
        return
    }
    
    # Convert SSH URL to HTTPS if needed
    if ($repoUrl -match "git@") {
        $repoUrl = $repoUrl -replace "git@", "https://"
        $repoUrl = $repoUrl -replace ":", "/"
    }
    
    # Remove .git suffix
    $repoUrl = $repoUrl -replace "\.git$", ""
    
    # Open in browser
    $sandboxUrl = "https://codesandbox.io/s/github$($repoUrl -replace '.*github\.com', '')"
    Start-Process $sandboxUrl
    Write-Status "Opening CodeSandbox..." "Info"
}

# Function to commit changes
function Save-Changes {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Message
    )
    
    git add .
    git commit -m $Message
    Write-Status "Changes committed: $Message" "Info"
}

# Function to push changes
function Push-Changes {
    git push origin main
    Write-Status "Changes pushed to GitHub" "Info"
}

# Function to check Vercel deployment
function Test-VercelDeployment {
    if (Get-Command vercel -ErrorAction SilentlyContinue) {
        vercel ls
    } else {
        Write-Status "Vercel CLI not installed. Install with: npm i -g vercel" "Warning"
    }
}

# Function to show help
function Show-Help {
    Write-Host "`nCursor Workflow Commands:`n"
    Write-Host "Test-GitStatus         - Check for uncommitted changes"
    Write-Host "Open-CodeSandbox      - Open project in CodeSandbox"
    Write-Host "Save-Changes 'message' - Commit changes with message"
    Write-Host "Push-Changes          - Push changes to GitHub"
    Write-Host "Test-VercelDeployment - Check Vercel deployment status"
    Write-Host "`nExample usage:"
    Write-Host "Test-GitStatus"
    Write-Host "Save-Changes 'Update README'"
    Write-Host "Push-Changes"
}

# Export functions
Export-ModuleMember -Function Test-GitStatus, Open-CodeSandbox, Save-Changes, Push-Changes, Test-VercelDeployment, Show-Help 