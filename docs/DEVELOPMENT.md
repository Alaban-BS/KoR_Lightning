# Development Guide

This guide explains how to set up and work with the project using Cursor IDE and GitHub.

## Prerequisites

1. **GitHub Account**
   - Create an account at [GitHub](https://github.com)
   - Set up SSH keys for secure repository access

2. **Cursor IDE**
   - Download and install [Cursor](https://cursor.sh)
   - Install recommended extensions

3. **Node.js**
   - Install Node.js 18.x from [nodejs.org](https://nodejs.org)
   - Verify installation: `node --version`

4. **Vercel Account**
   - Sign up at [Vercel](https://vercel.com)
   - Connect your GitHub account

## Development Setup

1. **Clone the Repository**
   ```bash
   git clone git@github.com:your-username/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Cursor**
   - Open the project folder in Cursor
   - The IDE will automatically detect the project settings

## Development Workflow

1. **Create a New Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Use Cursor's features for code completion and refactoring
   - Follow the project's coding standards
   - Write tests for new features

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

4. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Select your feature branch
   - Add description and reviewers

## Testing

1. **Run Tests**
   ```bash
   npm test
   ```

2. **Lint Code**
   ```bash
   npm run lint
   ```

3. **Type Check**
   ```bash
   npm run type-check
   ```

## Deployment

1. **Automatic Deployment**
   - Push to `main` branch triggers Vercel deployment
   - Check deployment status in Vercel dashboard

2. **Manual Deployment**
   ```bash
   npm run build
   vercel --prod
   ```

## Cursor IDE Features

1. **Code Navigation**
   - Use `Cmd/Ctrl + P` to quickly open files
   - Use `Cmd/Ctrl + Shift + F` to search across files
   - Use `F12` to go to definition

2. **Code Generation**
   - Use AI features for code completion
   - Generate documentation
   - Create tests

3. **Refactoring**
   - Use `F2` to rename symbols
   - Extract methods and variables
   - Move files and update imports

## Best Practices

1. **Code Style**
   - Follow TypeScript best practices
   - Use ESLint and Prettier
   - Write meaningful commit messages

2. **Git Workflow**
   - Keep branches up to date with main
   - Use meaningful branch names
   - Review code before merging

3. **Testing**
   - Write unit tests for new features
   - Maintain test coverage
   - Test edge cases

## Troubleshooting

1. **Build Issues**
   - Clear `.next` directory
   - Run `npm run clean`
   - Check Node.js version

2. **Dependency Issues**
   - Delete `node_modules`
   - Clear npm cache
   - Run `npm install`

3. **IDE Issues**
   - Reload Cursor window
   - Clear IDE cache
   - Update Cursor to latest version

## Resources

1. **Documentation**
   - [Next.js Documentation](https://nextjs.org/docs)
   - [React Documentation](https://reactjs.org/docs)
   - [TypeScript Documentation](https://www.typescriptlang.org/docs)

2. **Tools**
   - [Cursor Documentation](https://cursor.sh/docs)
   - [GitHub Actions](https://docs.github.com/en/actions)
   - [Vercel Documentation](https://vercel.com/docs) 