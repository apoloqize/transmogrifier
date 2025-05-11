# Contributing to Transmogrifier

Thank you for considering contributing to Transmogrifier! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers understand your report, reproduce the issue, and find related reports.

- **Use the GitHub issue tracker** — Check if the bug has already been reported by searching on GitHub under [Issues](https://github.com/apoloqize/transmogrifier/issues).
- **Use the bug report template** — When you create a new issue, use the provided bug report template to provide all the necessary information.
- **Provide clear steps to reproduce** — Include specific steps to reproduce the problem, with expected vs. actual results.
- **Include relevant details** — Your environment, browser, operating system, etc.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

- **Use the GitHub issue tracker** — Check if the enhancement has already been suggested by searching on GitHub under [Issues](https://github.com/apoloqize/transmogrifier/issues).
- **Use the feature request template** — When you create a new issue, use the provided feature request template.
- **Provide a clear use case** — Explain why this enhancement would be useful to most Transmogrifier users.

### Pull Requests

- **Fill in the required pull request template**
- **Do not include issue numbers in the PR title**
- **Follow the TypeScript and React stylistic conventions**
- **Include tests when adding new features**
- **Ensure all tests pass locally before submission**
- **End all files with a newline**

## Development Setup

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Setup Process

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/apoloqize/transmogrifier.git
   cd transmogrifier
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```

### Development Workflow

1. Make your changes
2. Run tests to make sure everything works:
   ```bash
   npm run test
   # or
   yarn test
   ```
3. Run the linter to ensure code style compliance:
   ```bash
   npm run lint
   # or
   yarn lint
   ```
4. Run the development server to manually test changes:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Commit your changes using conventional commit format:
   ```bash
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve issue with conversion logic"
   ```

## Style Guidelines

### TypeScript Stylistic Guidelines

- Use TypeScript for all new code
- Define explicit types for functions, parameters, and return values
- Avoid the `any` type where possible
- Use interfaces for object types
- Use functional components with hooks for React components

### React Best Practices

- Use React Server Components where possible
- Minimize 'use client' directives
- Use Suspense for async operations
- Follow the component-based architecture pattern
- Keep components small and focused on a single responsibility
- Use proper prop typing
- Avoid unnecessary re-renders

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding or refactoring tests
- `chore:` for tooling changes, build tasks, etc.

## Testing

We use Jest and React Testing Library for testing. Please include tests for new features or bug fixes. Run tests with:

```bash
npm run test
# or
yarn test
```

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

* `bug` - Issues that report a bug or problem
* `enhancement` - Issues that request a new feature
* `documentation` - Issues related to documentation
* `duplicate` - Issues that are duplicates of another issue
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `question` - Further information is requested
* `wontfix` - This will not be worked on

## Thank You!

Thank you for contributing to Transmogrifier! Your efforts help make this project better for everyone.
