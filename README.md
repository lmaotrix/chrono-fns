# chrono-fns 🕰️

[![npm version](https://badge.fury.io/js/chrono-fns.svg)](https://badge.fury.io/js/chrono-fns)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**A Type-Safe, Natural-Language Date Utility Library**

`chrono-fns` is a lightweight, type-safe, modular TypeScript library that makes working with dates intuitive and powerful. It combines natural language parsing with comprehensive date utilities and flexible formatting options.

## 🚀 Features

### 🧠 Natural Language Parsing
Parse human-readable date expressions into precise `Date` objects with confidence scoring:
- **Basic expressions**: "today", "tomorrow", "yesterday", "now"
- **Relative time**: "in 2 hours", "3 days ago", "5 minutes from now"
- **Weekday references**: "next Monday", "last Friday", "this Saturday"
- **Period references**: "beginning of month", "end of week"
- **Time expressions**: "noon", "midnight"

### 📅 Comprehensive Date Utilities
Robust date manipulation functions with type safety:
- **Arithmetic**: Add/subtract days, hours, minutes, weeks, months, years
- **Comparisons**: Check if dates are before, after, or equal
- **Calculations**: Find differences between dates in any time unit
- **Boundaries**: Get start/end of day, week, month, year
- **Validation**: Check if date values are valid

### ✨ Flexible Formatting
Multiple formatting options for displaying dates:
- **Pattern-based**: "YYYY-MM-DD", "MM/DD/YYYY HH:mm:ss"
- **Relative time**: "2 hours ago", "in 3 days"
- **Human-readable**: "Wednesday, July 9, 2025"
- **Time formats**: 12-hour ("3:30 PM") and 24-hour ("15:30")
- **Duration**: "2 days, 3 hours, 15 minutes"

### 🔒 Type Safety
Built entirely with TypeScript for maximum reliability:
- **Strict typing**: All functions have precise type definitions
- **Type guards**: Built-in validation for date inputs
- **IntelliSense**: Full IDE support with autocompletion
- **Error handling**: Clear error messages for invalid inputs

## 📦 Installation

```bash
npm install chrono-fns
```

```bash
yarn add chrono-fns
```

```bash
pnpm add chrono-fns
```

## 🎯 Quick Start

```typescript
import {
  parseNatural,
  formatDate,
  formatRelative,
  addDays,
  today,
  tomorrow,
  differenceInDays
} from 'chrono-fns';

// Natural language parsing
const meetingDate = parseNatural('next Friday at 2pm');
console.log('Meeting:', meetingDate); // Date object for next Friday

// Date arithmetic
const deadline = addDays(today(), 7);
console.log('Deadline:', formatDate(deadline, 'YYYY-MM-DD'));

// Relative formatting
const lastWeek = addDays(today(), -7);
console.log('Last week was:', formatRelative(lastWeek)); // "7 days ago"

// Date comparisons
const daysLeft = differenceInDays(deadline, today());
console.log(`${daysLeft} days until deadline`);
```

## 🌟 Key Concepts

### DateLike Type
Most functions accept a `DateLike` type, which can be:
- `Date` object
- ISO date string (e.g., "2025-07-09")
- Unix timestamp (number)

```typescript
import { addDays } from 'chrono-fns';

// All of these work:
addDays(new Date(), 1);           // Date object
addDays('2025-07-09', 1);         // ISO string
addDays(1720537200000, 1);        // Unix timestamp
```

### Natural Language Parsing
The `parseNatural` function returns a detailed result object:

```typescript
interface NLPParseResult {
  date: Date | null;     // Parsed date or null if parsing failed
  confidence: number;    // Confidence score (0-1)
  matched: string;       // Part of input that was matched
  remaining: string;     // Remaining unparsed text
}
```

### Supported Natural Language Expressions

#### Basic Time References
- `"today"` → Current date at midnight
- `"tomorrow"` → Next day at midnight
- `"yesterday"` → Previous day at midnight
- `"now"` → Current date and time

#### Relative Time
- `"in 2 hours"` → 2 hours from now
- `"3 days ago"` → 3 days before now
- `"5 minutes from now"` → 5 minutes from now
- `"1 week ahead"` → 1 week from now

#### Weekday References
- `"next Monday"` → Next occurring Monday
- `"last Friday"` → Previous Friday
- `"this Saturday"` → Current week's Saturday

#### Period Boundaries
- `"beginning of month"` → First day of current month
- `"end of month"` → Last day of current month
- `"start of week"` → First day of current week
- `"end of week"` → Last day of current week

#### Time of Day
- `"noon"` → 12:00 PM today
- `"midnight"` → 12:00 AM today

## 📖 Comprehensive Examples

### Natural Language Parsing

```typescript
import { parseNatural, canParse } from 'chrono-fns';

// Basic parsing
const result = parseNatural('tomorrow');
if (result.date) {
  console.log('Parsed date:', result.date);
  console.log('Confidence:', result.confidence); // 0.95
}

// Check if a string can be parsed
if (canParse('next Monday')) {
  const date = parseNatural('next Monday').date;
  console.log('Next Monday:', date);
}

// Handle parsing failures
const invalid = parseNatural('invalid date');
if (!invalid.date) {
  console.log('Could not parse date');
}
```

### Date Arithmetic

```typescript
import { 
  addDays, 
  subtractHours, 
  addMonths, 
  today, 
  startOfMonth, 
  endOfWeek 
} from 'chrono-fns';

const now = today();

// Add/subtract time
const nextWeek = addDays(now, 7);
const twoHoursAgo = subtractHours(now, 2);
const nextMonth = addMonths(now, 1);

// Period boundaries
const monthStart = startOfMonth(now);
const weekEnd = endOfWeek(now);

console.log('Next week:', nextWeek);
console.log('Two hours ago:', twoHoursAgo);
console.log('Month starts:', monthStart);
console.log('Week ends:', weekEnd);
```

### Date Comparisons

```typescript
import { 
  isBefore, 
  isAfter, 
  isEqual, 
  differenceInDays, 
  differenceInHours 
} from 'chrono-fns';

const date1 = new Date('2025-07-09');
const date2 = new Date('2025-07-10');

// Comparisons
console.log('date1 is before date2:', isBefore(date1, date2)); // true
console.log('date1 is after date2:', isAfter(date1, date2));   // false
console.log('Dates are equal:', isEqual(date1, date2));        // false

// Differences
console.log('Days difference:', differenceInDays(date2, date1)); // 1
console.log('Hours difference:', differenceInHours(date2, date1)); // 24
```

### Formatting

```typescript
import { 
  formatDate, 
  formatRelative, 
  formatHuman, 
  formatTime12, 
  formatTime24, 
  formatDuration 
} from 'chrono-fns';

const date = new Date('2025-07-09T15:30:00');

// Various formats
console.log('ISO format:', formatDate(date, 'YYYY-MM-DD')); // "2025-07-09"
console.log('US format:', formatDate(date, 'MM/DD/YYYY'));  // "07/09/2025"
console.log('Full format:', formatDate(date, 'YYYY-MM-DD HH:mm:ss')); // "2025-07-09 15:30:00"

// Human-readable
console.log('Human:', formatHuman(date)); // "Wednesday, July 9, 2025"

// Time formats
console.log('12-hour:', formatTime12(date)); // "3:30 PM"
console.log('24-hour:', formatTime24(date)); // "15:30"

// Relative time
const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
console.log('Relative:', formatRelative(pastDate)); // "2 hours ago"

// Duration
const start = new Date('2025-07-09T10:00:00');
const end = new Date('2025-07-11T14:30:00');
console.log('Duration:', formatDuration(start, end)); // "2 days, 4 hours, 30 minutes"
```

## 🔧 Advanced Usage

### Custom Default Dates

```typescript
import { parseNatural } from 'chrono-fns';

const customBase = new Date('2025-01-01');
const result = parseNatural('tomorrow', { defaultDate: customBase });
// Parses "tomorrow" relative to January 1, 2025
```

### Strict Parsing Mode

```typescript
import { parseNatural } from 'chrono-fns';

// Strict mode: only natural language expressions, no fallback to Date constructor
const result = parseNatural('2025-07-09', { strict: true });
console.log(result.date); // null (would normally parse as ISO date)
```

### Error Handling

```typescript
import { toDate, isValid } from 'chrono-fns';

try {
  const date = toDate('invalid-date');
} catch (error) {
  console.log('Invalid date:', error.message);
}

// Or check validity first
if (isValid('2025-07-09')) {
  const date = toDate('2025-07-09');
  console.log('Valid date:', date);
}
```

## 📚 Documentation

For comprehensive API documentation, examples, and guides:

- [API Reference](docs/API.md) - Complete function documentation
- [Natural Language Guide](docs/NLP.md) - Detailed parsing examples
- [Formatting Guide](docs/FORMATTING.md) - All formatting options
- [Migration Guide](docs/MIGRATION.md) - Upgrading between versions
- [Contributing Guide](docs/CONTRIBUTING.md) - How to contribute

## 🎮 Try It Out

Run the example script to see the library in action:

```bash
npm run build
node -r ts-node/register examples/demo.ts
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](docs/CONTRIBUTING.md) for details on:

- Code of conduct
- Development setup
- Testing requirements
- Pull request process

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by libraries like `date-fns` and `moment.js`
- Built with TypeScript for maximum developer experience
- Tested with Vitest for reliability

---

**Made with ❤️ by the chrono-fns dev**
