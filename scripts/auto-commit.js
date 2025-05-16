const { execSync } = require('child_process');
const path = require('path');

function autoCommit() {
  try {
    // Get the current timestamp
    const timestamp = new Date().toISOString();
    
    // Add all changes
    execSync('git add .', { stdio: 'inherit' });
    
    // Commit with timestamp
    execSync(`git commit -m "Auto-commit: ${timestamp}"`, { stdio: 'inherit' });
    
    console.log('Changes committed successfully!');
  } catch (error) {
    console.error('Error during auto-commit:', error.message);
  }
}

// Run the auto-commit
autoCommit(); 