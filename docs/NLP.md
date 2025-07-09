# Natural Language Guide

This guide covers the natural language parsing capabilities of `chrono-fns`, including examples and detailed explanations of supported expressions.

## Overview

`chrono-fns` translates human-readable date expressions into precise `Date` objects. This guide details the expressions you can use and how to effectively apply them.

## Supported Expressions

### Basic Time References
- **`"today"`**: Current date at midnight
- **`"tomorrow"`**: Next day at midnight
- **`"yesterday"`**: Previous day at midnight
- **`"now"`**: Current date and time

### Relative Time
- **`"in 2 hours"`**: 2 hours from now
- **`"3 days ago"`**: 3 days before now
- **`"5 minutes from now"`**: 5 minutes from now
- **`"1 week ahead"`**: 1 week from now

### Weekday References
- **`"next Monday"`**: Next occurring Monday
- **`"last Friday"`**: Previous Friday
- **`"this Saturday"`**: Current week's Saturday

### Period Boundaries
- **`"beginning of month"`**: First day of current month
- **`"end of month"`**: Last day of current month
- **`"start of week"`**: First day of current week
- **`"end of week"`**: Last day of current week

### Time of Day
- **`"noon"`**: 12:00 PM today
- **`"midnight"`**: 12:00 AM today

## Examples

### Simple Parsing

```typescript
import { parseNatural } from 'chrono-fns';

const result = parseNatural('tomorrow');
console.log('Tomorrow:', result.date);
```

### Relative Time Parsing

```typescript
import { parseNatural } from 'chrono-fns';

const result = parseNatural('in 3 days');
console.log('In 3 days:', result.date);
```

### Weekday Parsing

```typescript
import { parseNatural } from 'chrono-fns';

const result = parseNatural('next Monday');
console.log('Next Monday:', result.date);
```

## Handling Invalid Expressions

If a string can't be parsed, `parseNatural` returns a result with `date` set to `null`.

```typescript
import { parseNatural } from 'chrono-fns';

const result = parseNatural('invalid expression');
if (!result.date) {
  console.log('Could not parse expression');
}
```
