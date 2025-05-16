# Get the current timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Add all changes
git add .

# Commit with timestamp
git commit -m "Auto-commit: $timestamp"

Write-Host "Changes committed successfully!" 