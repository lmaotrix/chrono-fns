import { NLPParseResult, ParseOptions, TimeUnit } from '../types';
import { today, tomorrow, yesterday, now } from '../core/index';
import { add, subtract, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from '../utils/index';

/**
 * Parse natural language date expressions into Date objects
 */
export function parseNatural(input: string, options: ParseOptions = {}): NLPParseResult {
  const { defaultDate = now(), strict = false } = options;
  const normalizedInput = input.toLowerCase().trim();
  
  // Try different parsing strategies
  const parsers = [
    parseRelativeKeywords,
    parseRelativeTime,
    parseWeekdays,
    parseMonthReferences,
    parseTimeExpressions,
  ];
  
  for (const parser of parsers) {
    const result = parser(normalizedInput, defaultDate);
    if (result.date) {
      return result;
    }
  }
  
  // If strict mode is enabled and no match found, return null
  if (strict) {
    return {
      date: null,
      confidence: 0,
      matched: '',
      remaining: normalizedInput,
    };
  }
  
  // Try to parse as a regular date string
  try {
    const date = new Date(input);
    if (!isNaN(date.getTime())) {
      return {
        date,
        confidence: 0.5,
        matched: input,
        remaining: '',
      };
    }
  } catch {
    // Fall through to return null
  }
  
  return {
    date: null,
    confidence: 0,
    matched: '',
    remaining: normalizedInput,
  };
}

/**
 * Parse relative keywords like "today", "tomorrow", "yesterday"
 */
function parseRelativeKeywords(input: string, defaultDate: Date): NLPParseResult {
  const patterns = [
    { regex: /^(today|now)(?:\s+|$)/i, fn: () => today() },
    { regex: /^tomorrow(?:\s+|$)/i, fn: () => tomorrow() },
    { regex: /^yesterday(?:\s+|$)/i, fn: () => yesterday() },
  ];
  
  for (const pattern of patterns) {
    const match = input.match(pattern.regex);
    if (match) {
      return {
        date: pattern.fn(),
        confidence: 0.95,
        matched: match[0].trim(),
        remaining: input.replace(match[0], '').trim(),
      };
    }
  }
  
  return { date: null, confidence: 0, matched: '', remaining: input };
}

/**
 * Parse relative time expressions like "in 2 hours", "3 days ago"
 */
function parseRelativeTime(input: string, defaultDate: Date): NLPParseResult {
  // Pattern for "in X unit" or "X unit from now"
  const futurePattern = /^(?:in\s+)?(\d+)\s+(milliseconds?|seconds?|minutes?|hours?|days?|weeks?|months?|years?)(?:\s+(?:from\s+now|ahead))?$/i;
  
  // Pattern for "X unit ago"
  const pastPattern = /^(\d+)\s+(milliseconds?|seconds?|minutes?|hours?|days?|weeks?|months?|years?)\s+ago$/i;
  
  let match = input.match(futurePattern);
  if (match) {
    const amount = parseInt(match[1]!);
    const unit = normalizeTimeUnit(match[2]!);
    const date = add(defaultDate, amount, unit);
    
    return {
      date,
      confidence: 0.9,
      matched: match[0],
      remaining: input.replace(match[0], '').trim(),
    };
  }
  
  match = input.match(pastPattern);
  if (match) {
    const amount = parseInt(match[1]!);
    const unit = normalizeTimeUnit(match[2]!);
    const date = subtract(defaultDate, amount, unit);
    
    return {
      date,
      confidence: 0.9,
      matched: match[0],
      remaining: input.replace(match[0], '').trim(),
    };
  }
  
  return { date: null, confidence: 0, matched: '', remaining: input };
}

/**
 * Parse weekday references like "next monday", "last friday"
 */
function parseWeekdays(input: string, defaultDate: Date): NLPParseResult {
  const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  // Pattern for "next/last weekday"
  const pattern = /^(next|last|this)\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/i;
  
  const match = input.match(pattern);
  if (match) {
    const modifier = match[1]!.toLowerCase();
    const weekday = match[2]!.toLowerCase();
    const targetDay = weekdays.indexOf(weekday);
    
    if (targetDay === -1) {
      return { date: null, confidence: 0, matched: '', remaining: input };
    }
    
    const currentDay = defaultDate.getDay();
    const date = new Date(defaultDate);
    
    let daysToAdd = targetDay - currentDay;
    
    if (modifier === 'next') {
      if (daysToAdd <= 0) {
        daysToAdd += 7;
      }
    } else if (modifier === 'last') {
      if (daysToAdd >= 0) {
        daysToAdd -= 7;
      }
    } else if (modifier === 'this') {
      // For "this", we want the closest occurrence
      if (daysToAdd < 0) {
        daysToAdd += 7;
      }
    }
    
    date.setDate(date.getDate() + daysToAdd);
    date.setHours(0, 0, 0, 0); // Set to midnight
    
    return {
      date,
      confidence: 0.85,
      matched: match[0],
      remaining: input.replace(match[0], '').trim(),
    };
  }
  
  return { date: null, confidence: 0, matched: '', remaining: input };
}

/**
 * Parse month references like "beginning of month", "end of month"
 */
function parseMonthReferences(input: string, defaultDate: Date): NLPParseResult {
  const patterns = [
    { regex: /^(?:beginning|start)\s+of\s+(?:the\s+)?month$/i, fn: () => startOfMonth(defaultDate) },
    { regex: /^end\s+of\s+(?:the\s+)?month$/i, fn: () => endOfMonth(defaultDate) },
    { regex: /^(?:beginning|start)\s+of\s+(?:the\s+)?week$/i, fn: () => startOfWeek(defaultDate) },
    { regex: /^end\s+of\s+(?:the\s+)?week$/i, fn: () => endOfWeek(defaultDate) },
  ];
  
  for (const pattern of patterns) {
    const match = input.match(pattern.regex);
    if (match) {
      return {
        date: pattern.fn(),
        confidence: 0.8,
        matched: match[0],
        remaining: input.replace(match[0], '').trim(),
      };
    }
  }
  
  return { date: null, confidence: 0, matched: '', remaining: input };
}

/**
 * Parse time expressions like "noon", "midnight"
 */
function parseTimeExpressions(input: string, defaultDate: Date): NLPParseResult {
  const patterns = [
    { regex: /^noon$/i, hours: 12, minutes: 0 },
    { regex: /^midnight$/i, hours: 0, minutes: 0 },
  ];
  
  for (const pattern of patterns) {
    const match = input.match(pattern.regex);
    if (match) {
      const date = new Date(defaultDate);
      date.setHours(pattern.hours, pattern.minutes, 0, 0);
      
      return {
        date,
        confidence: 0.75,
        matched: match[0],
        remaining: input.replace(match[0], '').trim(),
      };
    }
  }
  
  return { date: null, confidence: 0, matched: '', remaining: input };
}

/**
 * Normalize time unit strings to standard TimeUnit values
 */
function normalizeTimeUnit(unit: string): TimeUnit {
  const normalized = unit.toLowerCase().replace(/s$/, ''); // Remove plural 's'
  
  switch (normalized) {
    case 'millisecond':
      return 'millisecond';
    case 'second':
      return 'second';
    case 'minute':
      return 'minute';
    case 'hour':
      return 'hour';
    case 'day':
      return 'day';
    case 'week':
      return 'week';
    case 'month':
      return 'month';
    case 'year':
      return 'year';
    default:
      throw new Error(`Unknown time unit: ${unit}`);
  }
}

/**
 * Convenience function that returns just the parsed date
 */
export function parse(input: string, options: ParseOptions = {}): Date | null {
  const result = parseNatural(input, options);
  return result.date;
}

/**
 * Check if a string can be parsed as a natural language date
 */
export function canParse(input: string, options: ParseOptions = {}): boolean {
  const result = parseNatural(input, options);
  return result.date !== null && result.confidence > 0.5;
}
