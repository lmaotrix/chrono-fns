# Formatting Guide

This guide covers all formatting options available in `chrono-fns` for displaying dates and times in various formats.

## Overview

`chrono-fns` provides multiple formatting functions to display dates and times in different styles, from simple patterns to human-readable formats.

## Format Functions

### formatDate(date: DateLike, format: DateFormat): string

Format a date using pattern strings.

**Supported Patterns:**
- `YYYY` - 4-digit year (e.g., 2025)
- `MM` - 2-digit month (01-12)
- `DD` - 2-digit day (01-31)
- `HH` - 2-digit hour (00-23)
- `mm` - 2-digit minute (00-59)
- `ss` - 2-digit second (00-59)

**Examples:**
```typescript
import { formatDate } from 'chrono-fns';

const date = new Date('2025-07-09T15:30:45');

formatDate(date, 'YYYY-MM-DD');          // "2025-07-09"
formatDate(date, 'MM/DD/YYYY');          // "07/09/2025"
formatDate(date, 'DD/MM/YYYY');          // "09/07/2025"
formatDate(date, 'YYYY-MM-DD HH:mm:ss'); // "2025-07-09 15:30:45"
```

### formatRelative(date: DateLike): string

Format a date as relative time from now.

**Examples:**
```typescript
import { formatRelative, addHours, subtractDays } from 'chrono-fns';

const now = new Date();
const futureDate = addHours(now, 3);
const pastDate = subtractDays(now, 2);

formatRelative(futureDate); // "in 3 hours"
formatRelative(pastDate);   // "2 days ago"
formatRelative(now);        // "just now"
```

### formatHuman(date: DateLike): string

Format a date as a human-readable string.

**Examples:**
```typescript
import { formatHuman } from 'chrono-fns';

const date = new Date('2025-07-09T15:30:00');
formatHuman(date); // "Wednesday, July 9, 2025"
```

### formatTime12(date: DateLike): string

Format time in 12-hour format with AM/PM.

**Examples:**
```typescript
import { formatTime12 } from 'chrono-fns';

const morning = new Date('2025-07-09T09:30:00');
const evening = new Date('2025-07-09T21:30:00');

formatTime12(morning); // "9:30 AM"
formatTime12(evening); // "9:30 PM"
```

### formatTime24(date: DateLike): string

Format time in 24-hour format.

**Examples:**
```typescript
import { formatTime24 } from 'chrono-fns';

const morning = new Date('2025-07-09T09:30:00');
const evening = new Date('2025-07-09T21:30:00');

formatTime24(morning); // "09:30"
formatTime24(evening); // "21:30"
```

### formatDisplay(date: DateLike, context?: 'short' | 'medium' | 'long'): string

Format a date for different display contexts.

**Examples:**
```typescript
import { formatDisplay } from 'chrono-fns';

const date = new Date('2025-07-09T15:30:00');

formatDisplay(date, 'short');  // "07/09/2025"
formatDisplay(date, 'medium'); // "07/09/2025 15:30:00"
formatDisplay(date, 'long');   // "Wednesday, July 9, 2025 at 3:30 PM"
```

### formatRange(start: DateLike, end: DateLike, separator?: string): string

Format a date range.

**Examples:**
```typescript
import { formatRange } from 'chrono-fns';

const start = new Date('2025-07-09');
const end = new Date('2025-07-15');

formatRange(start, end);         // "07/09/2025 - 07/15/2025"
formatRange(start, end, ' to '); // "07/09/2025 to 07/15/2025"
```

### formatDuration(start: DateLike, end: DateLike): string

Format the duration between two dates.

**Examples:**
```typescript
import { formatDuration } from 'chrono-fns';

const start = new Date('2025-07-09T10:00:00');
const end = new Date('2025-07-11T14:30:00');

formatDuration(start, end); // "2 days, 4 hours, 30 minutes"
```

## Common Use Cases

### Event Scheduling
```typescript
import { formatDate, formatTime12, formatRelative } from 'chrono-fns';

const eventDate = new Date('2025-07-15T14:30:00');

const eventDay = formatDate(eventDate, 'YYYY-MM-DD');
const eventTime = formatTime12(eventDate);
const timeUntil = formatRelative(eventDate);

console.log(`Event: ${eventDay} at ${eventTime}`);
console.log(`That's ${timeUntil}`);
```

### Date Logging
```typescript
import { formatDate } from 'chrono-fns';

const logTimestamp = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
console.log(`[${logTimestamp}] Application started`);
```

### User-Friendly Dates
```typescript
import { formatHuman, formatRelative } from 'chrono-fns';

const createdAt = new Date('2025-07-01T10:00:00');

const humanDate = formatHuman(createdAt);
const relativeDate = formatRelative(createdAt);

console.log(`Created: ${humanDate}`);
console.log(`That was ${relativeDate}`);
```

## Best Practices

### 1. Choose the Right Format
- Use `formatDate` for precise, structured dates
- Use `formatRelative` for user-friendly time references
- Use `formatHuman` for readable date displays

### 2. Consider Your Audience
- Use 12-hour format for general users
- Use 24-hour format for technical applications
- Use relative time for recent events

### 3. Be Consistent
- Stick to one format throughout your application
- Use the same time zone handling approach
- Maintain consistent date ordering (MM/DD vs DD/MM)

### 4. Handle Edge Cases
```typescript
import { formatRelative, isValid } from 'chrono-fns';

function safeFormatRelative(date: DateLike): string {
  if (!isValid(date)) {
    return 'Invalid date';
  }
  return formatRelative(date);
}
```

## Locale Considerations

Currently, `chrono-fns` uses English for all text-based formats. Future versions may include localization support for different languages and regions.

## Performance Tips

- Format dates once and cache the results when possible
- Use simpler formats for better performance
- Consider using `formatDisplay` for consistent formatting across your app
