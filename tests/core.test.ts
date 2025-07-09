import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  toDate, 
  isValid, 
  now, 
  today, 
  tomorrow, 
  yesterday, 
  clone, 
  isEqual, 
  isBefore, 
  isAfter, 
  differenceIn 
} from '../src/core/index';

describe('Core Utilities', () => {
  let mockDate: Date;

  beforeEach(() => {
    mockDate = new Date('2025-07-09T15:00:00Z');
    vi.setSystemTime(mockDate);
  });

  describe('toDate', () => {
    it('should return a new Date instance for Date input', () => {
      const input = new Date('2025-01-01');
      const result = toDate(input);
      expect(result).toEqual(input);
      expect(result).not.toBe(input); // Should be a new instance
    });

    it('should parse string dates', () => {
      const result = toDate('2025-07-09');
      expect(result).toEqual(new Date('2025-07-09'));
    });

    it('should parse number timestamps', () => {
      const timestamp = 1720537200000; // July 9, 2025
      const result = toDate(timestamp);
      expect(result).toEqual(new Date(timestamp));
    });

    it('should throw for invalid string dates', () => {
      expect(() => toDate('invalid')).toThrow('Invalid date: invalid');
    });

    it('should throw for invalid types', () => {
      expect(() => toDate({} as any)).toThrow('Invalid date type: object');
    });
  });

  describe('isValid', () => {
    it('should return true for valid dates', () => {
      expect(isValid(new Date('2025-07-09'))).toBe(true);
      expect(isValid('2025-07-09')).toBe(true);
      expect(isValid(1720537200000)).toBe(true);
    });

    it('should return false for invalid dates', () => {
      expect(isValid('invalid')).toBe(false);
      expect(isValid(new Date('invalid'))).toBe(false);
      expect(isValid(NaN)).toBe(false);
    });
  });

  describe('now', () => {
    it('should return current date and time', () => {
      const result = now();
      expect(result).toEqual(mockDate);
    });
  });

  describe('today', () => {
    it('should return today at midnight', () => {
      const result = today();
      // Use local time for comparison since today() uses local time
      const expected = new Date(mockDate);
      expected.setHours(0, 0, 0, 0);
      expect(result).toEqual(expected);
    });
  });

  describe('tomorrow', () => {
    it('should return tomorrow at midnight', () => {
      const result = tomorrow();
      // Use local time for comparison since tomorrow() uses local time
      const expected = new Date(mockDate);
      expected.setDate(expected.getDate() + 1);
      expected.setHours(0, 0, 0, 0);
      expect(result).toEqual(expected);
    });
  });

  describe('yesterday', () => {
    it('should return yesterday at midnight', () => {
      const result = yesterday();
      // Use local time for comparison since yesterday() uses local time
      const expected = new Date(mockDate);
      expected.setDate(expected.getDate() - 1);
      expected.setHours(0, 0, 0, 0);
      expect(result).toEqual(expected);
    });
  });

  describe('clone', () => {
    it('should create a copy of the date', () => {
      const original = new Date('2025-07-09');
      const cloned = clone(original);
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });
  });

  describe('isEqual', () => {
    it('should return true for equal dates', () => {
      const date1 = new Date('2025-07-09T15:00:00Z');
      const date2 = new Date('2025-07-09T15:00:00Z');
      expect(isEqual(date1, date2)).toBe(true);
    });

    it('should return false for different dates', () => {
      const date1 = new Date('2025-07-09T15:00:00Z');
      const date2 = new Date('2025-07-09T16:00:00Z');
      expect(isEqual(date1, date2)).toBe(false);
    });

    it('should work with different date types', () => {
      const date1 = new Date('2025-07-09');
      const date2 = '2025-07-09';
      expect(isEqual(date1, date2)).toBe(true);
    });
  });

  describe('isBefore', () => {
    it('should return true when first date is before second', () => {
      const date1 = new Date('2025-07-08');
      const date2 = new Date('2025-07-09');
      expect(isBefore(date1, date2)).toBe(true);
    });

    it('should return false when first date is after second', () => {
      const date1 = new Date('2025-07-10');
      const date2 = new Date('2025-07-09');
      expect(isBefore(date1, date2)).toBe(false);
    });

    it('should return false when dates are equal', () => {
      const date1 = new Date('2025-07-09');
      const date2 = new Date('2025-07-09');
      expect(isBefore(date1, date2)).toBe(false);
    });
  });

  describe('isAfter', () => {
    it('should return true when first date is after second', () => {
      const date1 = new Date('2025-07-10');
      const date2 = new Date('2025-07-09');
      expect(isAfter(date1, date2)).toBe(true);
    });

    it('should return false when first date is before second', () => {
      const date1 = new Date('2025-07-08');
      const date2 = new Date('2025-07-09');
      expect(isAfter(date1, date2)).toBe(false);
    });

    it('should return false when dates are equal', () => {
      const date1 = new Date('2025-07-09');
      const date2 = new Date('2025-07-09');
      expect(isAfter(date1, date2)).toBe(false);
    });
  });

  describe('differenceIn', () => {
    // Define dates as variables that can be properly processed
    let date1: Date;
    let date2: Date;
    
    beforeEach(() => {
      date1 = new Date('2025-07-09T15:00:00Z');
      date2 = new Date('2025-07-09T12:00:00Z');
    });

    it('should calculate difference in milliseconds', () => {
      const result = differenceIn(date1, date2, 'millisecond');
      expect(result).toBe(3 * 60 * 60 * 1000); // 3 hours in milliseconds
    });

    it('should calculate difference in seconds', () => {
      const result = differenceIn(date1, date2, 'second');
      expect(result).toBe(3 * 60 * 60); // 3 hours in seconds
    });

    it('should calculate difference in minutes', () => {
      const result = differenceIn(date1, date2, 'minute');
      expect(result).toBe(3 * 60); // 3 hours in minutes
    });

    it('should calculate difference in hours', () => {
      const result = differenceIn(date1, date2, 'hour');
      expect(result).toBe(3);
    });

    it('should calculate difference in days', () => {
      const dateA = new Date('2025-07-12');
      const dateB = new Date('2025-07-09');
      const result = differenceIn(dateA, dateB, 'day');
      expect(result).toBe(3);
    });

    it('should calculate difference in weeks', () => {
      const dateA = new Date('2025-07-16');
      const dateB = new Date('2025-07-09');
      const result = differenceIn(dateA, dateB, 'week');
      expect(result).toBe(1);
    });

    it('should calculate difference in months', () => {
      const dateA = new Date('2025-09-09');
      const dateB = new Date('2025-07-09');
      const result = differenceIn(dateA, dateB, 'month');
      expect(result).toBe(2);
    });

    it('should calculate difference in years', () => {
      const dateA = new Date('2027-07-09');
      const dateB = new Date('2025-07-09');
      const result = differenceIn(dateA, dateB, 'year');
      expect(result).toBe(2);
    });

    it('should handle negative differences', () => {
      const result = differenceIn(date2, date1, 'hour');
      expect(result).toBe(-3);
    });

    it('should throw for unknown units', () => {
      expect(() => differenceIn(date1, date2, 'unknown' as any)).toThrow('Unknown unit: unknown');
    });
  });
});
