# Contributing to React TypeScript Order System

Thank you for your interest in contributing to our project! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Next.js Development Guidelines

### 1. File Structure

- Place all pages in the `src/app` directory
- Use the new App Router structure
- Follow the Next.js 13+ conventions for layouts and pages

### 2. Routing

- Use the file-system based routing
- Create dynamic routes using `[param]` folders
- Use route groups with `(group)` folders
- Implement loading and error states

### 3. Data Fetching

- Use Server Components when possible
- Implement proper data fetching patterns:
  - `getServerSideProps` for SSR
  - `getStaticProps` for SSG
  - `getStaticPaths` for dynamic routes
- Use React Query for client-side data fetching

### 4. Performance

- Use the Next.js Image component
- Implement proper code splitting
- Use dynamic imports when appropriate
- Follow the performance best practices

### 5. TypeScript

- Use strict TypeScript configuration
- Define proper types for all components
- Use type inference when possible
- Avoid using `any` type

### 6. Styling

- Use Material-UI with Emotion
- Follow the project's styling conventions
- Use CSS-in-JS for component-specific styles
- Implement responsive design

### 7. Testing

- Write unit tests for components
- Implement integration tests
- Use proper testing utilities
- Follow testing best practices

## Pull Request Process

1. Create a new branch for your feature
2. Make your changes
3. Run tests and linting
4. Submit a pull request
5. Wait for review and approval

## Code Style

- Follow the project's ESLint configuration
- Use Prettier for code formatting
- Follow the TypeScript guidelines
- Write meaningful commit messages

## Documentation

- Update README.md if needed
- Document new features
- Add comments to complex code
- Update type definitions

## Questions?

Feel free to open an issue for any questions or concerns. 