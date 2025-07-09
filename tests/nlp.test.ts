import { describe, it, expect, beforeEach, vi } from 'vitest';
import { parseNatural, parse, canParse } from '../src/nlp/index';
import { today, tomorrow, yesterday, now } from '../src/core/index';
import { addDays, addHours, addMinutes, subtractDays, subtractHours, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from '../src/utils/index';

describe('NLP Parser', () => {
  let mockDate: Date;

  beforeEach(() => {
    // Mock a specific date for consistent testing
    mockDate = new Date('2025-07-09T15:00:00Z'); // Wednesday, July 9, 2025, 3:00 PM
    vi.setSystemTime(mockDate);
  });

  describe('parseNatural', () => {
    describe('relative keywords', () => {
      it('should parse "today"', () => {
        const result = parseNatural('today');
        expect(result.date).toEqual(today());
        expect(result.confidence).toBe(0.95);
        expect(result.matched).toBe('today');
        expect(result.remaining).toBe('');
      });

      it('should parse "tomorrow"', () => {
        const result = parseNatural('tomorrow');
        expect(result.date).toEqual(tomorrow());
        expect(result.confidence).toBe(0.95);
        expect(result.matched).toBe('tomorrow');
        expect(result.remaining).toBe('');
      });

      it('should parse "yesterday"', () => {
        const result = parseNatural('yesterday');
        expect(result.date).toEqual(yesterday());
        expect(result.confidence).toBe(0.95);
        expect(result.matched).toBe('yesterday');
        expect(result.remaining).toBe('');
      });

      it('should parse "now"', () => {
        const result = parseNatural('now');
        expect(result.date).toEqual(today());
        expect(result.confidence).toBe(0.95);
        expect(result.matched).toBe('now');
        expect(result.remaining).toBe('');
      });

      it('should be case insensitive', () => {
        const result = parseNatural('TOMORROW');
        expect(result.date).toEqual(tomorrow());
        expect(result.confidence).toBe(0.95);
      });
    });

    describe('relative time expressions', () => {
      it('should parse "in 2 hours"', () => {
        const result = parseNatural('in 2 hours');
        const expected = addHours(mockDate, 2);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.9);
        expect(result.matched).toBe('in 2 hours');
      });

      it('should parse "3 days ago"', () => {
        const result = parseNatural('3 days ago');
        const expected = subtractDays(mockDate, 3);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.9);
        expect(result.matched).toBe('3 days ago');
      });

      it('should parse "in 1 week"', () => {
        const result = parseNatural('in 1 week');
        const expected = addDays(mockDate, 7);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.9);
      });

      it('should parse "2 months ago"', () => {
        const result = parseNatural('2 months ago');
        const expected = new Date(mockDate);
        expected.setMonth(expected.getMonth() - 2);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.9);
      });

      it('should parse "5 minutes from now"', () => {
        const result = parseNatural('5 minutes from now');
        const expected = addMinutes(mockDate, 5);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.9);
      });

      it('should parse "1 year ahead"', () => {
        const result = parseNatural('1 year ahead');
        const expected = new Date(mockDate);
        expected.setFullYear(expected.getFullYear() + 1);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.9);
      });

      it('should handle singular and plural units', () => {
        const singular = parseNatural('1 day ago');
        const plural = parseNatural('2 days ago');
        
        expect(singular.date).toEqual(subtractDays(mockDate, 1));
        expect(plural.date).toEqual(subtractDays(mockDate, 2));
      });

      it('should parse without "in" prefix', () => {
        const result = parseNatural('30 minutes from now');
        const expected = addMinutes(mockDate, 30);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.9);
      });
    });

    describe('weekday references', () => {
      // mockDate is Wednesday, July 9, 2025
      it('should parse "next monday"', () => {
        const result = parseNatural('next monday');
        // Next Monday should be July 14, 2025 at local midnight
        const expected = new Date('2025-07-14');
        expected.setHours(0, 0, 0, 0);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.85);
      });

      it('should parse "last friday"', () => {
        const result = parseNatural('last friday');
        // Last Friday should be July 4, 2025 at local midnight
        const expected = new Date('2025-07-04');
        expected.setHours(0, 0, 0, 0);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.85);
      });

      it('should parse "this saturday"', () => {
        const result = parseNatural('this saturday');
        // This Saturday should be July 12, 2025 at local midnight
        const expected = new Date('2025-07-12');
        expected.setHours(0, 0, 0, 0);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.85);
      });

      it('should parse "next sunday"', () => {
        const result = parseNatural('next sunday');
        // Next Sunday should be July 13, 2025 at local midnight
        const expected = new Date('2025-07-13');
        expected.setHours(0, 0, 0, 0);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.85);
      });

      it('should be case insensitive', () => {
        const result = parseNatural('NEXT FRIDAY');
        const expected = new Date('2025-07-11');
        expected.setHours(0, 0, 0, 0);
        expect(result.date).toEqual(expected);
      });
    });

    describe('month references', () => {
      it('should parse "beginning of month"', () => {
        const result = parseNatural('beginning of month');
        const expected = startOfMonth(mockDate);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.8);
      });

      it('should parse "end of month"', () => {
        const result = parseNatural('end of month');
        const expected = endOfMonth(mockDate);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.8);
      });

      it('should parse "start of the month"', () => {
        const result = parseNatural('start of the month');
        const expected = startOfMonth(mockDate);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.8);
      });

      it('should parse "beginning of week"', () => {
        const result = parseNatural('beginning of week');
        const expected = startOfWeek(mockDate);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.8);
      });

      it('should parse "end of the week"', () => {
        const result = parseNatural('end of the week');
        const expected = endOfWeek(mockDate);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.8);
      });
    });

    describe('time expressions', () => {
      it('should parse "noon"', () => {
        const result = parseNatural('noon');
        const expected = new Date(mockDate);
        expected.setHours(12, 0, 0, 0);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.75);
      });

      it('should parse "midnight"', () => {
        const result = parseNatural('midnight');
        const expected = new Date(mockDate);
        expected.setHours(0, 0, 0, 0);
        expect(result.date).toEqual(expected);
        expect(result.confidence).toBe(0.75);
      });
    });

    describe('fallback behavior', () => {
      it('should try to parse regular date strings', () => {
        const result = parseNatural('2025-12-25');
        expect(result.date).toEqual(new Date('2025-12-25'));
        expect(result.confidence).toBe(0.5);
      });

      it('should return null for unparseable strings', () => {
        const result = parseNatural('invalid date string');
        expect(result.date).toBeNull();
        expect(result.confidence).toBe(0);
      });

      it('should respect strict mode', () => {
        const result = parseNatural('2025-12-25', { strict: true });
        expect(result.date).toBeNull();
        expect(result.confidence).toBe(0);
      });
    });

    describe('with custom default date', () => {
      it('should use custom default date for relative calculations', () => {
        const customDate = new Date('2025-01-01T12:00:00Z');
        const result = parseNatural('in 1 day', { defaultDate: customDate });
        const expected = addDays(customDate, 1);
        expect(result.date).toEqual(expected);
      });
    });
  });

  describe('parse convenience function', () => {
    it('should return just the date for valid input', () => {
      const result = parse('tomorrow');
      expect(result).toEqual(tomorrow());
    });

    it('should return null for invalid input', () => {
      const result = parse('invalid');
      expect(result).toBeNull();
    });
  });

  describe('canParse function', () => {
    it('should return true for parseable strings with good confidence', () => {
      expect(canParse('tomorrow')).toBe(true);
      expect(canParse('in 2 hours')).toBe(true);
      expect(canParse('next monday')).toBe(true);
    });

    it('should return false for unparseable strings', () => {
      expect(canParse('invalid date string')).toBe(false);
    });

    it('should return false for low confidence parses', () => {
      // Regular date strings have 0.5 confidence, which is not > 0.5
      expect(canParse('2025-12-25')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle empty strings', () => {
      const result = parseNatural('');
      expect(result.date).toBeNull();
      expect(result.confidence).toBe(0);
    });

    it('should handle whitespace', () => {
      const result = parseNatural('   tomorrow   ');
      expect(result.date).toEqual(tomorrow());
      expect(result.confidence).toBe(0.95);
    });

    it('should handle mixed case', () => {
      const result = parseNatural('ToMoRrOw');
      expect(result.date).toEqual(tomorrow());
      expect(result.confidence).toBe(0.95);
    });

    it('should handle large numbers', () => {
      const result = parseNatural('in 1000 days');
      const expected = addDays(mockDate, 1000);
      expect(result.date).toEqual(expected);
      expect(result.confidence).toBe(0.9);
    });

    it('should handle zero values', () => {
      const result = parseNatural('0 days ago');
      expect(result.date).toEqual(mockDate);
      expect(result.confidence).toBe(0.9);
    });
  });

  describe('remaining text handling', () => {
    it('should track remaining text after parsing', () => {
      const result = parseNatural('tomorrow extra text');
      expect(result.matched).toBe('tomorrow');
      expect(result.remaining).toBe('extra text');
    });

    it('should handle no remaining text', () => {
      const result = parseNatural('tomorrow');
      expect(result.remaining).toBe('');
    });
  });
});
