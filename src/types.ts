export type DateLike = Date | string | number;

export interface DateRange {
  start: Date;
  end: Date;
}

export interface RelativeTimeOptions {
  locale?: string;
  numeric?: 'always' | 'auto';
}

export interface FormatOptions {
  locale?: string;
  timeZone?: string;
}

export interface ParseOptions {
  defaultDate?: Date;
  strict?: boolean;
}

export interface NLPParseResult {
  date: Date | null;
  confidence: number;
  matched: string;
  remaining: string;
}

export type TimeUnit = 
  | 'millisecond' 
  | 'second' 
  | 'minute' 
  | 'hour' 
  | 'day' 
  | 'week' 
  | 'month' 
  | 'year';

export type DateFormat = 
  | 'YYYY-MM-DD'
  | 'MM/DD/YYYY'
  | 'DD/MM/YYYY'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'MM/DD/YYYY HH:mm:ss'
  | 'DD/MM/YYYY HH:mm:ss';
