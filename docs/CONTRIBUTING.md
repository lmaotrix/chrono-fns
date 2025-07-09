# Contributing Guide

Thank you for considering contributing to `chrono-fns`! This guide will help you get started with contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

## How to Contribute

### 1. Reporting Bugs

If you find a bug:
1. Check if it's already reported in the [Issues](https://github.com/lmaotrix/chrono-fns/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Code examples
   - Environment details (OS, Node.js version, etc.)

### 2. Requesting Features

For new features:
1. Check existing feature requests
2. Open a new issue with the "enhancement" label
3. Describe the feature and its use case
4. Provide examples of how it would be used

### 3. Contributing Code

#### Development Setup

1. **Fork the repository**
   ```bash
   git fork https://github.com/lmaotrix/chrono-fns.git
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/lmaotrix/chrono-fns.git
   cd chrono-fns
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Build the project**
   ```bash
   npm run build
   ```

#### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following our style guide
   - Add tests for new functionality
   - Update documentation if needed

3. **Run tests and linting**
   ```bash
   npm test
   npm run lint
   npm run typecheck
   ```

4. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Fill out the template

## Project Structure

```
chrono-fns/
├── src/
│   ├── core/           # Core date utilities
│   ├── format/         # Formatting functions
│   ├── nlp/            # Natural language parsing
│   ├── utils/          # Date manipulation utilities
│   ├── types.ts        # Type definitions
│   └── index.ts        # Main export file
├── tests/              # Test files
├── examples/           # Example usage
├── docs/               # Documentation
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Provide type annotations for function parameters and return values
- Use strict type checking
- Export types from the main module

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Include trailing commas in multiline structures
- Use descriptive variable names
- Add JSDoc comments for public functions

### Example Function

```typescript
/**
 * Adds a specified number of days to a date
 * @param date - The date to add days to
 * @param days - The number of days to add
 * @returns A new Date object with the days added
 */
export function addDays(date: DateLike, days: number): Date {
  const result = clone(date);
  result.setDate(result.getDate() + days);
  return result;
}
```

## Testing

### Writing Tests

- Write tests for all new functions
- Use descriptive test names
- Test edge cases and error conditions
- Aim for high test coverage

### Test Structure

```typescript
describe('addDays', () => {
  it('should add days to a date', () => {
    const date = new Date('2025-07-09');
    const result = addDays(date, 3);
    expect(result).toEqual(new Date('2025-07-12'));
  });

  it('should handle negative days', () => {
    const date = new Date('2025-07-09');
    const result = addDays(date, -3);
    expect(result).toEqual(new Date('2025-07-06'));
  });

  it('should not mutate the original date', () => {
    const date = new Date('2025-07-09');
    const original = new Date(date);
    addDays(date, 3);
    expect(date).toEqual(original);
  });
});
```

### Running Tests

```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm run test:coverage      # With coverage report
```

## Documentation

### API Documentation

- Document all public functions
- Include usage examples
- Explain parameters and return values
- Document any thrown errors

### README Updates

- Update README for new features
- Add examples for new functionality
- Keep the API reference section current

## Natural Language Parsing

### Adding New Expressions

When adding new natural language expressions:

1. **Add the pattern to the appropriate parser function**
2. **Write comprehensive tests**
3. **Update documentation**
4. **Consider edge cases**

Example:
```typescript
// Add to parseRelativeKeywords function
{ regex: /^next\s+week$/i, fn: () => addWeeks(defaultDate, 1) },
```

### Testing Natural Language

- Test various phrasings
- Test case insensitivity
- Test confidence scoring
- Test remaining text handling

## Commit Messages

Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test changes
- `refactor:` for code refactoring
- `perf:` for performance improvements

Examples:
```bash
feat: add support for "next week" expression
fix: handle timezone edge case in formatRelative
docs: update API documentation for addDays
test: add comprehensive tests for parseNatural
```

## Pull Request Guidelines

### Before Submitting

- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] No breaking changes (or clearly documented)

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Added tests for new functionality
- [ ] All tests pass
- [ ] Tested edge cases

## Documentation
- [ ] Updated API documentation
- [ ] Updated README if needed
- [ ] Added examples if applicable
```

## Release Process

For maintainers:

1. **Update version in package.json**
2. **Update CHANGELOG.md**
3. **Run full test suite**
4. **Build and test the package**
5. **Create release tag**
6. **Publish to npm**

## Getting Help

If you need help:
1. Check this contributing guide
2. Look at existing issues and PRs
3. Read the documentation
4. Ask questions in discussions
5. Contact maintainers

## Recognition

Contributors are recognized in:
- README contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to `chrono-fns`! 🎉
