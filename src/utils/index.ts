import { DateLike, TimeUnit } from '../types';
import { toDate, clone } from '../core/index';

/**
 * Adds a specified amount of time to a date
 */
export function add(date: DateLike, amount: number, unit: TimeUnit): Date {
  const result = clone(date);
  
  switch (unit) {
    case 'millisecond':
      result.setMilliseconds(result.getMilliseconds() + amount);
      break;
    case 'second':
      result.setSeconds(result.getSeconds() + amount);
      break;
    case 'minute':
      result.setMinutes(result.getMinutes() + amount);
      break;
    case 'hour':
      result.setHours(result.getHours() + amount);
      break;
    case 'day':
      result.setDate(result.getDate() + amount);
      break;
    case 'week':
      result.setDate(result.getDate() + amount * 7);
      break;
    case 'month':
      result.setMonth(result.getMonth() + amount);
      break;
    case 'year':
      result.setFullYear(result.getFullYear() + amount);
      break;
    default:
      throw new Error(`Unknown unit: ${unit}`);
  }
  
  return result;
}

/**
 * Subtracts a specified amount of time from a date
 */
export function subtract(date: DateLike, amount: number, unit: TimeUnit): Date {
  return add(date, -amount, unit);
}

/**
 * Convenience functions for common operations
 */
export function addDays(date: DateLike, days: number): Date {
  return add(date, days, 'day');
}

export function subtractDays(date: DateLike, days: number): Date {
  return subtract(date, days, 'day');
}

export function addHours(date: DateLike, hours: number): Date {
  return add(date, hours, 'hour');
}

export function subtractHours(date: DateLike, hours: number): Date {
  return subtract(date, hours, 'hour');
}

export function addMinutes(date: DateLike, minutes: number): Date {
  return add(date, minutes, 'minute');
}

export function subtractMinutes(date: DateLike, minutes: number): Date {
  return subtract(date, minutes, 'minute');
}

export function addWeeks(date: DateLike, weeks: number): Date {
  return add(date, weeks, 'week');
}

export function subtractWeeks(date: DateLike, weeks: number): Date {
  return subtract(date, weeks, 'week');
}

export function addMonths(date: DateLike, months: number): Date {
  return add(date, months, 'month');
}

export function subtractMonths(date: DateLike, months: number): Date {
  return subtract(date, months, 'month');
}

export function addYears(date: DateLike, years: number): Date {
  return add(date, years, 'year');
}

export function subtractYears(date: DateLike, years: number): Date {
  return subtract(date, years, 'year');
}

/**
 * Start/end of time period functions
 */
export function startOfDay(date: DateLike): Date {
  const result = clone(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function endOfDay(date: DateLike): Date {
  const result = clone(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

export function startOfWeek(date: DateLike, weekStartsOn: number = 0): Date {
  const result = startOfDay(date);
  const day = result.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  result.setDate(result.getDate() - diff);
  return result;
}

export function endOfWeek(date: DateLike, weekStartsOn: number = 0): Date {
  const result = startOfWeek(date, weekStartsOn);
  result.setDate(result.getDate() + 6);
  return endOfDay(result);
}

export function startOfMonth(date: DateLike): Date {
  const result = clone(date);
  result.setDate(1);
  return startOfDay(result);
}

export function endOfMonth(date: DateLike): Date {
  const result = clone(date);
  result.setMonth(result.getMonth() + 1, 0);
  return endOfDay(result);
}

export function startOfYear(date: DateLike): Date {
  const result = clone(date);
  result.setMonth(0, 1);
  return startOfDay(result);
}

export function endOfYear(date: DateLike): Date {
  const result = clone(date);
  result.setMonth(11, 31);
  return endOfDay(result);
}

/**
 * Difference functions
 */
export function differenceInDays(a: DateLike, b: DateLike): number {
  const dateA = startOfDay(a);
  const dateB = startOfDay(b);
  return Math.floor((dateA.getTime() - dateB.getTime()) / (1000 * 60 * 60 * 24));
}

export function differenceInHours(a: DateLike, b: DateLike): number {
  return Math.floor((toDate(a).getTime() - toDate(b).getTime()) / (1000 * 60 * 60));
}

export function differenceInMinutes(a: DateLike, b: DateLike): number {
  return Math.floor((toDate(a).getTime() - toDate(b).getTime()) / (1000 * 60));
}

export function differenceInSeconds(a: DateLike, b: DateLike): number {
  return Math.floor((toDate(a).getTime() - toDate(b).getTime()) / 1000);
}

/**
 * Comparison functions
 */
export function isSameDay(a: DateLike, b: DateLike): boolean {
  const dateA = toDate(a);
  const dateB = toDate(b);
  return dateA.getFullYear() === dateB.getFullYear() &&
         dateA.getMonth() === dateB.getMonth() &&
         dateA.getDate() === dateB.getDate();
}

export function isSameWeek(a: DateLike, b: DateLike, weekStartsOn: number = 0): boolean {
  const weekA = startOfWeek(a, weekStartsOn);
  const weekB = startOfWeek(b, weekStartsOn);
  return isSameDay(weekA, weekB);
}

export function isSameMonth(a: DateLike, b: DateLike): boolean {
  const dateA = toDate(a);
  const dateB = toDate(b);
  return dateA.getFullYear() === dateB.getFullYear() &&
         dateA.getMonth() === dateB.getMonth();
}

export function isSameYear(a: DateLike, b: DateLike): boolean {
  return toDate(a).getFullYear() === toDate(b).getFullYear();
}
