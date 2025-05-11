# Framework-Specific Best Practices

## TypeScript Usage
- Use TypeScript for all code with proper type safety
- Prefer interfaces over types for better extensibility
- Avoid enums; use const maps instead
- Use `satisfies` operator for type validation

## React & Next.js
- Favor React Server Components (RSC) where possible
- Minimize 'use client' directives
- Use Suspense for async operations
- Optimize for performance and Web Vitals

## State Management
- Use `useActionState` instead of deprecated `useFormState`
- Leverage enhanced `useFormStatus` with new properties
- Implement URL state management with 'nuqs'
- Minimize client-side state

## Async Patterns
```typescript
// Always use async versions of runtime APIs
const cookieStore = await cookies()
const headersList = await headers()
const { isEnabled } = await draftMode()

// Handle async params in layouts/pages
const params = await props.params
const searchParams = await props.searchParams
```

## Analysis Process
1. **Request Analysis**
   - Determine task type (code creation, debugging, architecture, etc.)
   - Identify frameworks involved
   - Define core problem and desired outcome
   - Consider project context and constraints

2. **Solution Planning**
   - Break down solutions into logical steps
   - Consider alternative approaches
   - Evaluate performance implications
   - Plan for testing and validation
