# Setup Guide

This guide will help you set up the project on your local machine.

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the Vite development server at `http://localhost:5173`

2. For production build:
   ```bash
   npm run build
   ```

3. To preview the production build:
   ```bash
   npm run preview
   ```

## Environment Setup

1. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=your_api_url
   ```

2. Available environment variables:
   - `VITE_API_URL`: API endpoint URL
   - `VITE_I18N_DEBUG`: Enable i18n debugging (true/false)

## TypeScript Configuration

The project uses TypeScript with the following configuration:

- Strict mode enabled
- React 18 JSX transform
- Path aliases configured
- Module resolution: Node

## IDE Setup

### VS Code

Recommended extensions:
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- vscode-styled-components

### WebStorm

The project is configured to work with WebStorm out of the box.

## Troubleshooting

### Common Issues

1. **Module not found errors**
   - Clear node_modules and reinstall:
     ```bash
     rm -rf node_modules
     npm install
     ```

2. **TypeScript errors**
   - Clear TypeScript cache:
     ```bash
     rm -rf node_modules/.cache/typescript
     ```

3. **Build errors**
   - Ensure all dependencies are installed
   - Check for TypeScript errors
   - Verify environment variables

## Additional Resources

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Material-UI Documentation](https://mui.com/getting-started/usage/) 