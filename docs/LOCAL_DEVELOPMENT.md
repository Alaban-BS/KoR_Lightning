# Local Development Guide

This guide explains how to set up and run the application locally for testing before deployment.

## Quick Start

1. **Start Development Server**
   ```bash
   npm run dev
   ```
   This will start the application at `http://localhost:3000`

2. **Build for Testing**
   ```bash
   npm run build
   npm run start
   ```
   This simulates the production build locally at `http://localhost:3000`

## Development Environment

### 1. Environment Variables
Create a `.env.local` file in your project root:
```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 2. Local Testing Tools

1. **Browser Developer Tools**
   - Open Chrome DevTools (F12)
   - Use React Developer Tools extension
   - Monitor Network tab for API calls

2. **Console Logging**
   ```typescript
   // Add this to your code for debugging
   console.log('Debug:', { yourVariable });
   ```

3. **Hot Reloading**
   - Changes will automatically refresh in development
   - Use `npm run dev` for the best development experience

### 3. Testing Different Scenarios

1. **Test Production Build**
   ```bash
   # Build the application
   npm run build
   
   # Start the production server
   npm run start
   ```

2. **Test API Routes**
   ```bash
   # Using curl or Postman
   curl http://localhost:3000/api/your-endpoint
   ```

3. **Test Different Browsers**
   - Chrome
   - Firefox
   - Safari
   - Edge

## Common Development Tasks

### 1. Clear Cache and Rebuild
```bash
# Clear Next.js cache
rm -rf .next

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Start development server
npm run dev
```

### 2. Debug Build Issues
```bash
# Check for TypeScript errors
npm run type-check

# Check for linting issues
npm run lint

# Check for dependency issues
npm audit
```

### 3. Monitor Performance
1. Open Chrome DevTools
2. Go to Performance tab
3. Record performance metrics
4. Analyze loading times and bottlenecks

## Local Testing Checklist

Before deploying to Vercel, verify:

1. **Functionality**
   - [ ] All features work as expected
   - [ ] No console errors
   - [ ] API calls succeed
   - [ ] Forms submit correctly

2. **Performance**
   - [ ] Page load times are acceptable
   - [ ] No memory leaks
   - [ ] Smooth animations
   - [ ] Responsive design works

3. **Compatibility**
   - [ ] Works in Chrome
   - [ ] Works in Firefox
   - [ ] Works in Safari
   - [ ] Works in Edge

4. **Build**
   - [ ] `npm run build` succeeds
   - [ ] `npm run start` works
   - [ ] No TypeScript errors
   - [ ] No linting errors

## Troubleshooting

### 1. Development Server Issues
```bash
# Kill any existing processes on port 3000
npx kill-port 3000

# Start fresh
npm run dev
```

### 2. Build Issues
```bash
# Clean install
rm -rf node_modules
rm -rf .next
npm install
npm run build
```

### 3. Performance Issues
1. Check browser console for errors
2. Monitor network requests
3. Check for memory leaks
4. Verify image optimization

## Next Steps

After local testing is successful:
1. Commit your changes
2. Push to GitHub
3. Create a pull request
4. Deploy to Vercel

Remember: Local testing helps catch issues early and saves time in the deployment process. 