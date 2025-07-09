# API Reference

This document provides comprehensive information on the API provided by `chrono-fns`. Each function is explained with examples and potential use cases.

## Functions

### 1. Natural Language Parsing

#### parseNatural(input: string, options?: ParseOptions): NLPParseResult

- **Description**: Transforms human-readable date expressions into `Date` objects.
- **Options**:
  - `defaultDate` (Date): The reference date for relative calculations.
  - `strict` (boolean): If `true`, will not attempt to parse invalid expressions using JavaScript's `Date` constructor.
- **Example**:

```typescript
import { parseNatural } from 'chrono-fns';

const result = parseNatural('next Friday');
console.log(result);
```

### 2. Date Utilities

#### addDays(date: DateLike, days: number): Date

- **Description**: Adds a specified number of days to a given date.
- **Example**:

```typescript
import { addDays } from 'chrono-fns';

const newDate = addDays(new Date(), 10);
console.log(newDate);
```

#### subtractMinutes(date: DateLike, minutes: number): Date

- **Description**: Subtracts a number of minutes from a date.
- **Example**:

```typescript
import { subtractMinutes } from 'chrono-fns';

const newTime = subtractMinutes(new Date(), 45);
console.log(newTime);
```

#### startOfWeek(date: DateLike): Date

- **Description**: Returns the starting date of the week for a given date.
- **Example**:

```typescript
import { startOfWeek } from 'chrono-fns';

const sunday = startOfWeek(new Date());
console.log(sunday);
```

### 3. Formatting

#### formatDate(date: DateLike, format: DateFormat): string

- **Description**: Formats a Date object into a string using a specified format.
- **Formats**: "YYYY-MM-DD", "MM/DD/YYYY", etc.
- **Example**:

```typescript
import { formatDate } from 'chrono-fns';

const formatted = formatDate(new Date(), 'YYYY-MM-DD');
console.log(formatted);
```

#### formatRelative(date: DateLike): string

- **Description**: Formats a Date object to a string like "2 days ago" or "in 3 hours" based on the current time.
- **Example**:

```typescript
import { formatRelative } from 'chrono-fns';

const relative = formatRelative(new Date('2025-12-25'));
console.log(relative);
```

### 4. Comparison

#### differenceInHours(a: DateLike, b: DateLike): number

- **Description**: Calculates the difference in hours between two dates.
- **Example**:

```typescript
import { differenceInHours } from 'chrono-fns';

const diff = differenceInHours(new Date(), new Date('2025-07-07'));
console.log(diff);
```

## Types

### DateLike

- **Definition**: Represents any value that can be converted to a `Date`. It may be a `Date` object, an ISO string, or a Unix timestamp.

### DateFormat

- **Definition**: String literals such as "YYYY-MM-DD", "MM/DD/YYYY", etc., used for formatting dates.

### NLPParseResult

- **Fields**:
  - `date`: `Date | null` - The parsed date object or null if the parsing fails.
  - `confidence`: `number` - A confidence score from 0 to 1.
  - `matched`: `string` - The matched portion of the input string.
  - `remaining`: `string` - The remaining unparsed part of the input string.
