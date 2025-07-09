import { DateLike, DateFormat, FormatOptions, RelativeTimeOptions } from '../types';
import { toDate, now, differenceIn } from '../core/index';

/**
 * Format a date according to a specified format string
 */
export function formatDate(date: DateLike, format: DateFormat, options: FormatOptions = {}): string {
  const d = toDate(date);
  
  // Simple format patterns
  const patterns: Record<string, () => string> = {
    'YYYY': () => d.getFullYear().toString(),
    'MM': () => (d.getMonth() + 1).toString().padStart(2, '0'),
    'DD': () => d.getDate().toString().padStart(2, '0'),
    'HH': () => d.getHours().toString().padStart(2, '0'),
    'mm': () => d.getMinutes().toString().padStart(2, '0'),
    'ss': () => d.getSeconds().toString().padStart(2, '0'),
  };
  
  let result = format;
  for (const [pattern, replacer] of Object.entries(patterns)) {
    result = result.replace(new RegExp(pattern, 'g'), replacer());
  }
  
  return result;
}

/**
 * Format a date as a relative time string (e.g., "2 hours ago", "in 3 days")
 */
export function formatRelative(date: DateLike, options: RelativeTimeOptions = {}): string {
  const d = toDate(date);
  const reference = now();
  
  const diff = d.getTime() - reference.getTime();
  const absDiff = Math.abs(diff);
  const isPast = diff < 0;
  
  // Define time units in milliseconds
  const units = [
    { unit: 'year', ms: 365 * 24 * 60 * 60 * 1000 },
    { unit: 'month', ms: 30 * 24 * 60 * 60 * 1000 },
    { unit: 'week', ms: 7 * 24 * 60 * 60 * 1000 },
    { unit: 'day', ms: 24 * 60 * 60 * 1000 },
    { unit: 'hour', ms: 60 * 60 * 1000 },
    { unit: 'minute', ms: 60 * 1000 },
    { unit: 'second', ms: 1000 },
  ];
  
  // Find the appropriate unit
  for (const { unit, ms } of units) {
    const value = Math.floor(absDiff / ms);
    if (value >= 1) {
      const plural = value > 1 ? 's' : '';
      if (isPast) {
        return `${value} ${unit}${plural} ago`;
      } else {
        return `in ${value} ${unit}${plural}`;
      }
    }
  }
  
  return 'just now';
}

/**
 * Format a date as a human-readable string
 */
export function formatHuman(date: DateLike, options: FormatOptions = {}): string {
  const d = toDate(date);
  
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const weekday = weekdays[d.getDay()];
  const month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  
  return `${weekday}, ${month} ${day}, ${year}`;
}

/**
 * Format time as a 12-hour string (e.g., "3:30 PM")
 */
export function formatTime12(date: DateLike): string {
  const d = toDate(date);
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  
  const minutesStr = minutes.toString().padStart(2, '0');
  
  return `${hours}:${minutesStr} ${ampm}`;
}

/**
 * Format time as a 24-hour string (e.g., "15:30")
 */
export function formatTime24(date: DateLike): string {
  const d = toDate(date);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes}`;
}

/**
 * Format a date for display in different contexts
 */
export function formatDisplay(date: DateLike, context: 'short' | 'medium' | 'long' = 'medium'): string {
  const d = toDate(date);
  
  switch (context) {
    case 'short':
      return formatDate(d, 'MM/DD/YYYY');
    case 'medium':
      return formatDate(d, 'MM/DD/YYYY HH:mm:ss');
    case 'long':
      return formatHuman(d) + ' at ' + formatTime12(d);
    default:
      return formatDate(d, 'MM/DD/YYYY HH:mm:ss');
  }
}

/**
 * Format a date range as a string
 */
export function formatRange(start: DateLike, end: DateLike, separator: string = ' - '): string {
  const startFormatted = formatDate(start, 'MM/DD/YYYY');
  const endFormatted = formatDate(end, 'MM/DD/YYYY');
  
  return `${startFormatted}${separator}${endFormatted}`;
}

/**
 * Format duration between two dates
 */
export function formatDuration(start: DateLike, end: DateLike): string {
  const startDate = toDate(start);
  const endDate = toDate(end);
  const diff = Math.abs(endDate.getTime() - startDate.getTime());
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  const parts: string[] = [];
  
  if (days > 0) {
    parts.push(`${days} day${days > 1 ? 's' : ''}`);
  }
  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  }
  
  if (parts.length === 0) {
    return 'less than a minute';
  }
  
  return parts.join(', ');
}
