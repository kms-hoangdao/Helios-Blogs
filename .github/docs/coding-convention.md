# Coding Conventions & Best Practices

## Core Development Principles

- Extract common functionality into shared services or utilities

### Clean Code Practices

- **Meaningful Names**: Use descriptive and meaningful names for variables, functions, classes, and interfaces
- **Single Responsibility Principle**: Each function, class, or module should have one clear responsibility
- **Avoid Deep Nesting**: Refactor deeply nested code into smaller functions or use early returns
- **Avoid Using Undefined**: Never use `undefined` explicitly; prefer `null` or proper type definitions
- **Consistent Formatting**: Follow consistent code formatting and style throughout the codebase
- **Modularization**: Break down large files into smaller, manageable modules

### Type Safety & Validation

- **Use DTOs with `class-validator` decorators** for all incoming data (body, query, params)
- **Prefer TypeScript types and interfaces** over `any` or `unknown`

### Async/Await & Promise Handling

- **Ensure all Promises are correctly handled** with `async/await`
- **No floating promises** - always await or properly handle async operations
- Use `Promise.all()` for concurrent operations when appropriate

## Error Handling & Logging

### Exception Management

- **Throw appropriate NestJS HTTP exceptions** with clear, user-friendly messages.
- **Avoid generic `Exception` or `Error`** - use specific, semantic exceptions

### Logging Standards

- **Replace all `console.log`, `console.error`** with injectable NestJS `Logger`
- Use appropriate log levels: `debug`, `log`, `warn`, `error`, `fatal`

## Configuration & Environment

- **All access to `process.env` must go through `@nestjs/config` `ConfigService`**

## Constants & Enums

- **Prioritize to use existing Constants and Enums** search and reuse before defining new ones

- **Magic Strings**: anything in qoute ('') Must be replaced with named constants or enums to improve maintainability
  E.g:

```typescript
const API_BASE_URL = 'https://api.example.com/v1'
```

- **Magic Numbers**: replace literal numbers with named constants for clarity and single point of change
  E.g:

```typescript
const MAX_RETRIES = 3
```

- **Convert related string options into TypeScript `enum`s** (statuses, types, etc.)
- E.g:

```typescript
enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}
```

- Store constants and Enums in dedicated files following Project Structure & Organization below

## Documentation & Code Quality

- **Resolve all `// TODO` comments** before merging
- **Remove unused variables, imports, functions, and dead code**
- **Not JSDoc comments allowed** Do not write any code comments
- **Keep functions small and focused** (single responsibility)

# Project Structure & Organization

## Shared Code Structure (`/libs/common/src`)

- `/constants` - Application-wide constants
- `/decorators` - Shared NestJS decorators
- `/dtos` - Shared Data Transfer Objects
- `/entities` - Shared TypeORM PostgreSQL entities
- `/interfaces` - Shared TypeScript interfaces
- `/repositories` - Shared repository patterns
- `/schemas` - Shared TypeORM MongoDB schemas
- `/utils` - Shared utility functions

## Service-Specific Code (`/src`)

- **Code that solely belongs to a service** should be in service `/src`
- Include: constants, DTOs, enums, interfaces specific to that service
- Maintain clear boundaries between shared and service-specific code
