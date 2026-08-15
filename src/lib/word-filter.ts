/**
 * Lightweight client-side profanity / inappropriate word filter.
 * Sanitizes user input before rendering onto the canvas.
 */

// List of profane / inappropriate terms (English & Roman Urdu)
const BLOCKED_WORDS = [
  'badword',
  'hate',
  'stupid',
  'idiot',
  'fool',
  'dumb',
  'ugly',
  'scam',
  'fake',
  'curse',
  'crap',
  'bitch',
  'bastard',
  'damn',
  'shit',
  'fuck',
  'asshole',
  'bakwas',
  'kutta',
  'kamina',
  'harami',
];

/**
 * Sanitizes a string by replacing inappropriate words with asterisks.
 */
export function sanitizeWishText(input: string): string {
  if (!input || typeof input !== 'string') return '';

  let sanitized = input;

  for (const word of BLOCKED_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    sanitized = sanitized.replace(regex, (match) => '*'.repeat(match.length));
  }

  return sanitized;
}
