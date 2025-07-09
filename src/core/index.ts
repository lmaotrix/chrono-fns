import { DateLike, TimeUnit } from '../types';

/**
 * Converts a DateLike value to a Date object
 */
export function toDate(value: DateLike): Date {
  if (value instanceof Date) {
    return new Date(value);
  }
  
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${value}`);
    }
    return date;
  }
  
  throw new Error(`Invalid date type: ${typeof value}`);
}

/**
 * Checks if a value is a valid date
 */
export function isValid(date: DateLike): boolean {
  try {
    const d = toDate(date);
    return !isNaN(d.getTime());
  } catch {
    return false;
  }
}

/**
 * Gets the current date and time
 */
export function now(): Date {
  return new Date();
}

/**
 * Gets today's date at midnight
 */
export function today(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Gets tomorrow's date at midnight
 */
export function tomorrow(): Date {
  const date = today();
  date.setDate(date.getDate() + 1);
  return date;
}

/**
 * Gets yesterday's date at midnight
 */
export function yesterday(): Date {
  const date = today();
  date.setDate(date.getDate() - 1);
  return date;
}

/**
 * Clones a date object
 */
export function clone(date: DateLike): Date {
  return new Date(toDate(date));
}

/**
 * Checks if two dates are equal
 */
export function isEqual(a: DateLike, b: DateLike): boolean {
  return toDate(a).getTime() === toDate(b).getTime();
}

/**
 * Checks if date a is before date b
 */
export function isBefore(a: DateLike, b: DateLike): boolean {
  return toDate(a).getTime() < toDate(b).getTime();
}

/**
 * Checks if date a is after date b
 */
export function isAfter(a: DateLike, b: DateLike): boolean {
  return toDate(a).getTime() > toDate(b).getTime();
}

/**
 * Gets the difference between two dates in the specified unit
 */
export function differenceIn(a: DateLike, b: DateLike, unit: TimeUnit): number {
  const dateA = toDate(a);
  const dateB = toDate(b);
  const diff = dateA.getTime() - dateB.getTime();
  
  switch (unit) {
    case 'millisecond':
      return diff;
    case 'second':
      return Math.floor(diff / 1000);
    case 'minute':
      return Math.floor(diff / (1000 * 60));
    case 'hour':
      return Math.floor(diff / (1000 * 60 * 60));
    case 'day':
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    case 'week':
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    case 'month':
      return (dateA.getFullYear() - dateB.getFullYear()) * 12 + 
             (dateA.getMonth() - dateB.getMonth());
    case 'year':
      return dateA.getFullYear() - dateB.getFullYear();
    default:
      throw new Error(`Unknown unit: ${unit}`);
  }
}
