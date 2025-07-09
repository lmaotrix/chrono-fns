# Migration Guide

This guide helps you migrate between different versions of `chrono-fns` and provides information about breaking changes.

## Version 1.x to 2.x (Future)

*This section will be updated when version 2.x is released*

### Breaking Changes
- TBD

### New Features
- TBD

### Migration Steps
- TBD

## Version 0.x to 1.x (Current)

Since this is the initial stable release, there are no migration steps needed.

## Migrating from Other Libraries

### From `date-fns`

If you're migrating from `date-fns`, here are the equivalent functions:

```typescript
// date-fns
import { addDays, format, parseISO } from 'date-fns';

// chrono-fns
import { addDays, formatDate, toDate } from 'chrono-fns';

// date-fns
const result = addDays(new Date(), 7);
const formatted = format(result, 'yyyy-MM-dd');

// chrono-fns
const result = addDays(new Date(), 7);
const formatted = formatDate(result, 'YYYY-MM-DD');
```

### From `moment.js`

If you're migrating from `moment.js`, here are the equivalent operations:

```typescript
// moment.js
import moment from 'moment';

// chrono-fns
import { addDays, formatDate, parseNatural } from 'chrono-fns';

// moment.js
const result = moment().add(7, 'days');
const formatted = result.format('YYYY-MM-DD');

// chrono-fns
const result = addDays(new Date(), 7);
const formatted = formatDate(result, 'YYYY-MM-DD');
```

### From Native Date

If you're migrating from native JavaScript Date operations:

```typescript
// Native Date
const date = new Date();
date.setDate(date.getDate() + 7);

// chrono-fns
import { addDays } from 'chrono-fns';
const date = addDays(new Date(), 7);
```

## Common Migration Patterns

### 1. Function Naming
`chrono-fns` uses descriptive function names:
- `add` → `addDays`, `addHours`, etc.
- `subtract` → `subtractDays`, `subtractHours`, etc.
- `format` → `formatDate`, `formatRelative`, etc.

### 2. Immutability
All `chrono-fns` functions return new Date objects and never mutate the input:

```typescript
// ❌ Mutating approach
const date = new Date();
date.setDate(date.getDate() + 1);

// ✅ Immutable approach
import { addDays } from 'chrono-fns';
const date = new Date();
const tomorrow = addDays(date, 1);
```

### 3. Type Safety
`chrono-fns` provides full TypeScript support:

```typescript
import { DateLike, formatDate } from 'chrono-fns';

// Type-safe function
function formatUserDate(date: DateLike): string {
  return formatDate(date, 'YYYY-MM-DD');
}
```

## Breaking Changes Policy

We follow semantic versioning (semver):
- **Major versions** (x.0.0): Breaking changes
- **Minor versions** (x.y.0): New features, backward compatible
- **Patch versions** (x.y.z): Bug fixes, backward compatible

## Deprecation Policy

When we need to deprecate a function:
1. The function is marked as deprecated in the documentation
2. A console warning is added in development mode
3. The function is removed in the next major version
4. A migration guide is provided

## Getting Help

If you need help with migration:
1. Check this migration guide
2. Review the [API documentation](API.md)
3. Look at the [examples](../examples/)
4. Open an issue on GitHub

## Common Issues

### Type Errors
If you encounter TypeScript errors:
```typescript
// ❌ Incorrect type
const date: string = addDays(new Date(), 1);

// ✅ Correct type
const date: Date = addDays(new Date(), 1);
```

### Import Errors
Make sure you're importing from the correct module:
```typescript
// ✅ Correct import
import { addDays } from 'chrono-fns';

// ❌ Incorrect import
import { addDays } from 'chrono-fns/core';
```

### Performance Issues
If you're experiencing performance issues:
1. Use specific imports instead of wildcard imports
2. Cache formatted dates when possible
3. Use simpler date operations when complex parsing isn't needed

## Feedback

If you have feedback about the migration process or encounter issues not covered in this guide, please:
1. Check existing issues on GitHub
2. Open a new issue with the "migration" label
3. Provide code examples of what you're trying to achieve
