# Using Workflow Commands in Cursor

## Quick Start

1. Open PowerShell in Cursor (Ctrl + `)
2. Import the workflow commands:
   ```powershell
   . ./scripts/cursor-workflow.ps1
   ```
3. Start using the commands!

## Available Commands

### Check Git Status
```powershell
Test-GitStatus
```
Shows if you have any uncommitted changes.

### Open CodeSandbox
```powershell
Open-CodeSandbox
```
Opens your project in CodeSandbox for testing.

### Save Changes
```powershell
Save-Changes "Your commit message"
```
Commits your changes with a message.

### Push to GitHub
```powershell
Push-Changes
```
Pushes your commits to GitHub.

### Check Vercel
```powershell
Test-VercelDeployment
```
Shows your Vercel deployment status.

### Show Help
```powershell
Show-Help
```
Shows all available commands.

## Common Workflows

### Quick Testing
1. Make changes in Cursor
2. ```powershell
   Open-CodeSandbox
   ```
3. Test in CodeSandbox
4. If successful:
   ```powershell
   Save-Changes "Your changes"
   Push-Changes
   ```

### Full Development Cycle
1. Make changes in Cursor
2. ```powershell
   Test-GitStatus
   ```
3. ```powershell
   Save-Changes "Your changes"
   ```
4. ```powershell
   Push-Changes
   ```
5. ```powershell
   Open-CodeSandbox
   ```
6. Test in CodeSandbox
7. ```powershell
   Test-VercelDeployment
   ```

## Tips

1. **Quick Access**: Import the commands once at the start of your session
2. **Color Coding**: Commands use colors to show status:
   - Green: Success/Info
   - Yellow: Warnings
   - Red: Errors
3. **Error Handling**: Commands check for common issues and show helpful messages

## Example Session

```powershell
# Import commands
. ./scripts/cursor-workflow.ps1

# Check status
Test-GitStatus

# Make some changes...

# Save changes
Save-Changes "Update feature X"

# Push to GitHub
Push-Changes

# Open in CodeSandbox
Open-CodeSandbox

# Check Vercel
Test-VercelDeployment
```

## Troubleshooting

### Command Not Found
Make sure you've imported the commands:
```powershell
. ./scripts/cursor-workflow.ps1
```

### Git Issues
Check if you're in a git repository:
```powershell
Test-GitStatus
```

### CodeSandbox Issues
Try opening manually:
```powershell
Open-CodeSandbox
```

### Vercel Issues
Check if Vercel CLI is installed:
```powershell
Test-VercelDeployment
``` 