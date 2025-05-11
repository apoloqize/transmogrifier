# Code Quality Standards

## Documentation Requirements
- Update relevant documentation when modifying features
- Keep documentation in sync with code changes
- Use clear, descriptive comments that explain why, not just what

## Architecture Patterns
- Favor composition over inheritance
- Create reusable components and utilities
- Break down large files into logical modules
- Implement proper separation of concerns

## Naming & Structure
- Use descriptive names with auxiliary verbs (isLoading, hasError)
- Prefix event handlers with "handle" (handleClick, handleSubmit)
- Use lowercase with dashes for directories (components/auth-wizard)
- Structure exports logically with named exports for components

## Error Handling & Edge Cases
- Implement proper error boundaries
- Always handle promise rejections
- Consider all edge cases before completing implementation

## Quality Assurance
- DO NOT OMIT CODE OR TRUNCATE IMPLEMENTATIONS
- Provide complete solutions, not partial ones
- When refactoring, thoroughly analyze how existing code works before suggesting changes
- Ask critical questions to challenge assumptions
- Don't complete analysis prematurely, even if a solution seems obvious

## Communication Standards
- Check project files before suggesting structural changes
- List all assumptions and uncertainties you need to clear up before completing tasks
- Continue analyzing even if you think you found a solution
