import { describe, it, expect, beforeEach, vi } from 'vitest';
import { parseNatural, parse, canParse } from '../src/nlp/index';
import { today, tomorrow, yesterday, now } from '../src/core/index';
import { addDays, addHours, addMinutes, subtractDays, subtractHours, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from '../src/utils/index';

describe('NLP Parser', () => {
  let mockDate: Date;

  beforeEach(() => {
    mockDate = new Date('2025-07-09T15:00:00Z'); // Wednesday, July 9, 2025, 3:00 PM
    vi.setSystemTime(mockDate);
  });

  describe('parseNatural', () => {
    it('should parse relative keywords', () => {
      // Basic keywords
      expect(parseNatural('today')).toEqual({
        date: today(),
        confidence: 0.95,
        matched: 'today',
        remaining: ''
      });
      
      expect(parseNatural('tomorrow')).toEqual({
        date: tomorrow(),
        confidence: 0.95,
        matched: 'tomorrow',
        remaining: ''
      });
      
      expect(parseNatural('yesterday')).toEqual({
        date: yesterday(),
        confidence: 0.95,
        matched: 'yesterday',
        remaining: ''
      });
      
      expect(parseNatural('now')).toEqual({
        date: today(),
        confidence: 0.95,
        matched: 'now',
        remaining: ''
      });
      
      // Case insensitive
      expect(parseNatural('TOMORROW').date).toEqual(tomorrow());
    });

    it('should parse relative time expressions', () => {
      // Future expressions
      expect(parseNatural('in 2 hours').date).toEqual(addHours(mockDate, 2));
      expect(parseNatural('5 minutes from now').date).toEqual(addMinutes(mockDate, 5));
      expect(parseNatural('in 1 week').date).toEqual(addDays(mockDate, 7));
      
      // Past expressions
      expect(parseNatural('3 days ago').date).toEqual(subtractDays(mockDate, 3));
      expect(parseNatural('1 day ago').date).toEqual(subtractDays(mockDate, 1));
      
      // Months and years
      const twoMonthsAgo = new Date(mockDate);
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
      expect(parseNatural('2 months ago').date).toEqual(twoMonthsAgo);
      
      const oneYearAhead = new Date(mockDate);
      oneYearAhead.setFullYear(oneYearAhead.getFullYear() + 1);
      expect(parseNatural('1 year ahead').date).toEqual(oneYearAhead);
      
      // Confidence and matching
      expect(parseNatural('in 2 hours').confidence).toBe(0.9);
      expect(parseNatural('in 2 hours').matched).toBe('in 2 hours');
    });

    it('should parse weekday references', () => {
      // mockDate is Wednesday, July 9, 2025
      const nextMonday = new Date('2025-07-14');
      nextMonday.setHours(0, 0, 0, 0);
      expect(parseNatural('next monday').date).toEqual(nextMonday);
      
      const lastFriday = new Date('2025-07-04');
      lastFriday.setHours(0, 0, 0, 0);
      expect(parseNatural('last friday').date).toEqual(lastFriday);
      
      const thisSaturday = new Date('2025-07-12');
      thisSaturday.setHours(0, 0, 0, 0);
      expect(parseNatural('this saturday').date).toEqual(thisSaturday);
      
      // Case insensitive
      const nextFriday = new Date('2025-07-11');
      nextFriday.setHours(0, 0, 0, 0);
      expect(parseNatural('NEXT FRIDAY').date).toEqual(nextFriday);
      
      expect(parseNatural('next monday').confidence).toBe(0.85);
    });

    it('should parse month and week references', () => {
      expect(parseNatural('beginning of month').date).toEqual(startOfMonth(mockDate));
      expect(parseNatural('end of month').date).toEqual(endOfMonth(mockDate));
      expect(parseNatural('start of the month').date).toEqual(startOfMonth(mockDate));
      expect(parseNatural('beginning of week').date).toEqual(startOfWeek(mockDate));
      expect(parseNatural('end of the week').date).toEqual(endOfWeek(mockDate));
      
      expect(parseNatural('beginning of month').confidence).toBe(0.8);
    });

    it('should parse time expressions', () => {
      const noon = new Date(mockDate);
      noon.setHours(12, 0, 0, 0);
      expect(parseNatural('noon').date).toEqual(noon);
      
      const midnight = new Date(mockDate);
      midnight.setHours(0, 0, 0, 0);
      expect(parseNatural('midnight').date).toEqual(midnight);
      
      expect(parseNatural('noon').confidence).toBe(0.75);
    });

    it('should handle fallback and edge cases', () => {
      // Regular date strings (fallback)
      expect(parseNatural('2025-12-25').date).toEqual(new Date('2025-12-25'));
      expect(parseNatural('2025-12-25').confidence).toBe(0.5);
      
      // Unparseable strings
      expect(parseNatural('invalid date string').date).toBeNull();
      expect(parseNatural('invalid date string').confidence).toBe(0);
      
      // Strict mode
      expect(parseNatural('2025-12-25', { strict: true }).date).toBeNull();
      
      // Custom default date
      const customDate = new Date('2025-01-01T12:00:00Z');
      const result = parseNatural('in 1 day', { defaultDate: customDate });
      expect(result.date).toEqual(addDays(customDate, 1));
      
      // Edge cases
      expect(parseNatural('').date).toBeNull();
      expect(parseNatural('   tomorrow   ').date).toEqual(tomorrow());
      expect(parseNatural('ToMoRrOw').date).toEqual(tomorrow());
      expect(parseNatural('in 1000 days').date).toEqual(addDays(mockDate, 1000));
      expect(parseNatural('0 days ago').date).toEqual(mockDate);
    });

    it('should handle remaining text', () => {
      const result = parseNatural('tomorrow extra text');
      expect(result.matched).toBe('tomorrow');
      expect(result.remaining).toBe('extra text');
      
      const result2 = parseNatural('tomorrow');
      expect(result2.remaining).toBe('');
    });
  });

  describe('helper functions', () => {
    it('should parse and canParse work correctly', () => {
      // parse - returns just the date
      expect(parse('tomorrow')).toEqual(tomorrow());
      expect(parse('invalid')).toBeNull();
      
      // canParse - returns boolean based on confidence
      expect(canParse('tomorrow')).toBe(true);
      expect(canParse('in 2 hours')).toBe(true);
      expect(canParse('next monday')).toBe(true);
      expect(canParse('invalid date string')).toBe(false);
      expect(canParse('2025-12-25')).toBe(false); // Low confidence (0.5)
    });
  });
});
