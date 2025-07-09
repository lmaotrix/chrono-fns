import { 
  parseNatural, 
  parse, 
  canParse,
  formatDate, 
  formatRelative, 
  formatHuman,
  addDays,
  subtractHours,
  differenceInDays,
  today,
  tomorrow,
  yesterday
} from '../src/index';

console.log('=== chrono-fns Demo ===\n');

// Natural Language Parsing
console.log(' * Natural Language Parsing:');
const expressions = [
  'tomorrow',
  'yesterday',
  'in 2 hours',
  '3 days ago',
  'next monday',
  'last friday',
  'noon',
  'midnight',
  'beginning of month',
  'end of week'
];

expressions.forEach(expr => {
  const result = parseNatural(expr);
  if (result.date) {
    console.log(`"${expr}" → ${result.date.toLocaleDateString()} ${result.date.toLocaleTimeString()} (confidence: ${result.confidence})`);
  } else {
    console.log(`"${expr}" → Could not parse`);
  }
});

console.log('\n * Date Utilities:');
const baseDate = new Date('2025-07-09T15:00:00');
console.log(`Base date: ${baseDate.toLocaleDateString()} ${baseDate.toLocaleTimeString()}`);
console.log(`Add 5 days: ${addDays(baseDate, 5).toLocaleDateString()}`);
console.log(`Subtract 2 hours: ${subtractHours(baseDate, 2).toLocaleTimeString()}`);
console.log(`Days until tomorrow: ${differenceInDays(tomorrow(), today())}`);

console.log('\n * Formatting:');
const sampleDate = new Date('2025-07-09T15:30:00');
console.log(`Standard format: ${formatDate(sampleDate, 'YYYY-MM-DD HH:mm:ss')}`);
console.log(`US format: ${formatDate(sampleDate, 'MM/DD/YYYY')}`);
console.log(`Human readable: ${formatHuman(sampleDate)}`);

// Relative formatting with different dates
const futureDate = addDays(new Date(), 3);
const pastDate = subtractHours(new Date(), 5);
console.log(`Future date: ${formatRelative(futureDate)}`);
console.log(`Past date: ${formatRelative(pastDate)}`);

console.log('\n * Parsing Tests:');
const testPhrases = [
  'tomorrow at 3pm',
  'invalid phrase',
  'in 1 week',
  'last tuesday'
];

testPhrases.forEach(phrase => {
  const canParsed = canParse(phrase);
  const parsed = parse(phrase);
  console.log(`"${phrase}" - Can parse: ${canParsed}, Result: ${parsed ? parsed.toLocaleDateString() : 'null'}`);
});

console.log('\n=== End Demo ===');
