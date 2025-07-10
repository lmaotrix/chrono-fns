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
    it('should handle different input types', () => {
      const date = new Date('2025-01-01');
      const timestamp = 1720537200000;
      
      // Date input - should return new instance
      const result1 = toDate(date);
      expect(result1).toEqual(date);
      expect(result1).not.toBe(date);
      
      // String input
      expect(toDate('2025-07-09')).toEqual(new Date('2025-07-09'));
      
      // Number input
      expect(toDate(timestamp)).toEqual(new Date(timestamp));
    });

    it('should throw for invalid inputs', () => {
      expect(() => toDate('invalid')).toThrow('Invalid date: invalid');
      expect(() => toDate({} as any)).toThrow('Invalid date type: object');
    });
  });

  describe('isValid', () => {
    it('should validate different date types', () => {
      // Valid dates
      expect(isValid(new Date('2025-07-09'))).toBe(true);
      expect(isValid('2025-07-09')).toBe(true);
      expect(isValid(1720537200000)).toBe(true);
      
      // Invalid dates
      expect(isValid('invalid')).toBe(false);
      expect(isValid(new Date('invalid'))).toBe(false);
      expect(isValid(NaN)).toBe(false);
    });
  });

  describe('date generators', () => {
    it('should generate correct dates', () => {
      expect(now()).toEqual(mockDate);
      
      const todayExpected = new Date(mockDate);
      todayExpected.setHours(0, 0, 0, 0);
      expect(today()).toEqual(todayExpected);
      
      const tomorrowExpected = new Date(mockDate);
      tomorrowExpected.setDate(tomorrowExpected.getDate() + 1);
      tomorrowExpected.setHours(0, 0, 0, 0);
      expect(tomorrow()).toEqual(tomorrowExpected);
      
      const yesterdayExpected = new Date(mockDate);
      yesterdayExpected.setDate(yesterdayExpected.getDate() - 1);
      yesterdayExpected.setHours(0, 0, 0, 0);
      expect(yesterday()).toEqual(yesterdayExpected);
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

  describe('date comparisons', () => {
    it('should compare dates correctly', () => {
      const date1 = new Date('2025-07-08');
      const date2 = new Date('2025-07-09');
      const date3 = new Date('2025-07-09');
      
      // isEqual
      expect(isEqual(date2, date3)).toBe(true);
      expect(isEqual(date1, date2)).toBe(false);
      expect(isEqual(date2, '2025-07-09')).toBe(true);
      
      // isBefore
      expect(isBefore(date1, date2)).toBe(true);
      expect(isBefore(date2, date1)).toBe(false);
      expect(isBefore(date2, date3)).toBe(false);
      
      // isAfter
      expect(isAfter(date2, date1)).toBe(true);
      expect(isAfter(date1, date2)).toBe(false);
      expect(isAfter(date2, date3)).toBe(false);
    });
  });

  describe('differenceIn', () => {
    it('should calculate differences in various units', () => {
      const date1 = new Date('2025-07-09T15:00:00Z');
      const date2 = new Date('2025-07-09T12:00:00Z');
      
      // Time units
      expect(differenceIn(date1, date2, 'millisecond')).toBe(3 * 60 * 60 * 1000);
      expect(differenceIn(date1, date2, 'second')).toBe(3 * 60 * 60);
      expect(differenceIn(date1, date2, 'minute')).toBe(3 * 60);
      expect(differenceIn(date1, date2, 'hour')).toBe(3);
      
      // Larger units
      expect(differenceIn(new Date('2025-07-12'), new Date('2025-07-09'), 'day')).toBe(3);
      expect(differenceIn(new Date('2025-07-16'), new Date('2025-07-09'), 'week')).toBe(1);
      expect(differenceIn(new Date('2025-09-09'), new Date('2025-07-09'), 'month')).toBe(2);
      expect(differenceIn(new Date('2027-07-09'), new Date('2025-07-09'), 'year')).toBe(2);
    });

    it('should handle negative differences and errors', () => {
      const date1 = new Date('2025-07-09T15:00:00Z');
      const date2 = new Date('2025-07-09T12:00:00Z');
      
      expect(differenceIn(date2, date1, 'hour')).toBe(-3);
      expect(() => differenceIn(date1, date2, 'unknown' as any)).toThrow('Unknown unit: unknown');
    });
  });
});
