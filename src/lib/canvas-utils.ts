/**
 * Utility functions for rendering and exporting digital keepsake badges
 */

export interface BadgeOptions {
  name?: string;
  wish?: string;
  frameIndex?: number;
  language?: 'en' | 'ur';
}

export function drawKeepsakeBadge(
  canvas: HTMLCanvasElement,
  options: BadgeOptions
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Deep Emerald Background
  ctx.fillStyle = '#012E17';
  ctx.fillRect(0, 0, width, height);

  // Border Gold Accent
  ctx.strokeStyle = '#C5A880';
  ctx.lineWidth = 8;
  ctx.strokeRect(16, 16, width - 32, height - 32);

  // Header Title
  ctx.fillStyle = '#F5F2EB';
  ctx.font = 'bold 24px var(--font-playfair-display), serif';
  ctx.textAlign = 'center';
  ctx.fillText('PAKISTAN 79TH INDEPENDENCE DAY', width / 2, 70);

  // Wish / Promise
  ctx.fillStyle = '#C5A880';
  ctx.font = '16px var(--font-plus-jakarta-sans), sans-serif';
  const text = options.wish || "Here's to a Pakistan we keep building, together.";
  ctx.fillText(`"${text}"`, width / 2, height / 2);

  // Footer Tag
  ctx.fillStyle = '#F3C623';
  ctx.font = '12px var(--font-jetbrains-mono), monospace';
  ctx.fillText('14 AUGUST 2026 • ECHOES & PATTERNS', width / 2, height - 50);
}
