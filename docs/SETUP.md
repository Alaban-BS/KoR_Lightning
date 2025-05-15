# Setup Guide

## Prerequisites

- Node.js 18.0.0 or later
- npm 9.0.0 or later

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

3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_APP_TITLE=Your App Title
   ```

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the Next.js development server at `http://localhost:3000`

## Environment Variables

The following environment variables are used in the project:

- `NEXT_PUBLIC_API_URL`: API endpoint URL
- `NEXT_PUBLIC_APP_TITLE`: Application title

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/             # Utility functions and configurations
│   ├── types/           # TypeScript type definitions
│   └── styles/          # Global styles
├── public/              # Static files
└── docs/               # Documentation
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Material-UI Documentation](https://mui.com/getting-started/usage/) 