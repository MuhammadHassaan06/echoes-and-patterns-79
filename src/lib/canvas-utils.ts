/**
 * Utility functions for rendering and exporting digital keepsake badges on HTML5 Canvas
 */

export interface BadgeOptions {
  name?: string;
  wish?: string;
  frameIndex?: number;
  language?: 'en' | 'ur';
}

/**
 * Draws a personalized keepsake badge onto the target HTML5 Canvas.
 */
export function drawKeepsakeBadge(
  canvas: HTMLCanvasElement,
  options: BadgeOptions
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  const scale = w / 600; // Base reference size 600x600

  const frameIndex = options.frameIndex ?? 0;
  const isUrdu = options.language === 'ur';
  const nameText = options.name?.trim() || (isUrdu ? 'پاکستان کا شہری' : 'Citizen of Pakistan');
  const wishText =
    options.wish?.trim() ||
    (isUrdu
      ? 'آؤ مل کر ایک ایسا پاکستان بنائیں جس پر ہم سب کو فخر ہو۔'
      : "Here's to a Pakistan we keep building, together.");

  // Save Canvas State
  ctx.save();
  ctx.direction = 'ltr';

  // 1. Clear Canvas
  ctx.clearRect(0, 0, w, h);

  // 2. Draw Selected Frame Background & Border
  switch (frameIndex) {
    case 0:
      drawTruckArtFrame(ctx, w, h, scale);
      break;
    case 1:
      drawAjrakFrame(ctx, w, h, scale);
      break;
    case 2:
    default:
      drawEmeraldWaveFrame(ctx, w, h, scale);
      break;
  }

  // 3. Render Top Header Badge Text (Shifted down to 54 * scale)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#F3C623';

  const headerY = 54 * scale;

  if (isUrdu) {
    ctx.save();
    ctx.direction = 'rtl';
    ctx.font = `bold ${Math.round(15 * scale)}px 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif`;

    const urduHeader = '\u200F\u06F7\u06F9\u0648\u0627\u06BA \u06CC\u0648\u0645\u0650 \u0622\u0632\u0627\u062F\u06CC \u067E\u0627\u06A9\u0633\u062A\u0627\u0646';
    ctx.fillText(urduHeader, w / 2, headerY);

    // Dynamic Left & Right Dots
    const textHalfWidth = ctx.measureText(urduHeader).width / 2;
    const dotGap = 12 * scale;
    const dotRadius = 2.5 * scale;

    ctx.beginPath();
    ctx.arc(w / 2 - textHalfWidth - dotGap, headerY, dotRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(w / 2 + textHalfWidth + dotGap, headerY, dotRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    ctx.font = `bold ${Math.round(11.5 * scale)}px 'JetBrains Mono', 'Courier New', monospace`;
    ctx.fillText('● 79TH INDEPENDENCE DAY TRIBUTE ●', w / 2, headerY);
  }

  // 4. Render Decorative Divider / Crescent Motif (Shifted to 76 * scale for clean breathing space)
  drawCrescentStarMotif(ctx, w / 2, 76 * scale, 9 * scale, '#C5A880');

  // 5. Render Personalized Name
  ctx.fillStyle = '#F5F2EB';
  ctx.font = isUrdu
    ? `bold ${Math.round(28 * scale)}px 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif`
    : `bold ${Math.round(24 * scale)}px 'Playfair Display', Georgia, serif`;

  ctx.shadowColor = 'rgba(243, 198, 35, 0.4)';
  ctx.shadowBlur = 6 * scale;

  const nameY = 112 * scale;
  ctx.fillText(nameText, w / 2, nameY);
  ctx.shadowBlur = 0; // Reset shadow

  // Name Underline Accent
  const nameWidth = ctx.measureText(nameText).width;
  const underlineWidth = Math.max(90 * scale, Math.min(nameWidth * 0.75, w * 0.45));
  ctx.beginPath();
  ctx.moveTo(w / 2 - underlineWidth / 2, nameY + 13 * scale);
  ctx.lineTo(w / 2 + underlineWidth / 2, nameY + 13 * scale);
  ctx.strokeStyle = '#C5A880';
  ctx.lineWidth = 1.5 * scale;
  ctx.stroke();

  // 6. Render Wish / Promise Quote Box
  const boxY = 142 * scale;
  const boxWidth = w - 120 * scale; // 480px at 600 width
  const boxHeight = 310 * scale;

  // Glassmorphic Quote Container Box
  ctx.fillStyle = 'rgba(1, 46, 23, 0.65)';
  ctx.strokeStyle = 'rgba(197, 168, 128, 0.35)';
  ctx.lineWidth = 1 * scale;
  roundRect(ctx, w / 2 - boxWidth / 2, boxY, boxWidth, boxHeight, 14 * scale, true, true);

  // Watermark Quotation Mark
  ctx.fillStyle = 'rgba(243, 198, 35, 0.2)';
  ctx.font = `bold ${Math.round(34 * scale)}px serif`;
  ctx.fillText('“', w / 2 - boxWidth / 2 + 24 * scale, boxY + 36 * scale);

  // Center Quote Text
  ctx.fillStyle = '#F5F2EB';
  ctx.font = isUrdu
    ? `${Math.round(24 * scale)}px 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif`
    : `italic 600 ${Math.round(21.5 * scale)}px 'Plus Jakarta Sans', Georgia, sans-serif`;

  const paddingX = 36 * scale;
  const lines = wrapText(ctx, `"${wishText}"`, boxWidth - paddingX * 2);
  const lineHeight = isUrdu ? 42 * scale : 31 * scale;
  const totalTextHeight = lines.length * lineHeight;
  const startY = boxY + (boxHeight / 2) - (totalTextHeight / 2) + (lineHeight / 2);

  lines.forEach((line, idx) => {
    ctx.fillText(line, w / 2, startY + idx * lineHeight);
  });

  // 7. Render Footer Stamp Tag
  ctx.save();
  ctx.fillStyle = '#C5A880';
  ctx.font = `bold ${Math.round(11 * scale)}px 'JetBrains Mono', 'Courier New', monospace`;
  ctx.fillText('14 AUGUST 2026 • KEEPSAKE BADGE NO. 79', w / 2, h - 74 * scale);

  ctx.fillStyle = 'rgba(245, 242, 235, 0.75)';
  ctx.font = `${Math.round(10 * scale)}px 'JetBrains Mono', 'Courier New', monospace`;
  ctx.fillText('ECHOES & PATTERNS • PAKISTAN@79', w / 2, h - 56 * scale);
  ctx.restore();

  ctx.restore();
}

/* ========================================================================= */
/* FRAME DRAWING ROUTINES                                                    */
/* ========================================================================= */

// 1. TRUCK ART MOTIF FRAME
function drawTruckArtFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  scale: number
) {
  ctx.fillStyle = '#012E17';
  ctx.fillRect(0, 0, w, h);

  // Chamakpatti Yellow Outer Border
  ctx.lineWidth = 14 * scale;
  ctx.strokeStyle = '#F3C623';
  ctx.strokeRect(10 * scale, 10 * scale, w - 20 * scale, h - 20 * scale);

  // Crimson Red Middle Band
  ctx.lineWidth = 6 * scale;
  ctx.strokeStyle = '#D9381E';
  ctx.strokeRect(20 * scale, 20 * scale, w - 40 * scale, h - 40 * scale);

  // Turquoise Inner Sawtooth Border
  ctx.lineWidth = 2 * scale;
  ctx.strokeStyle = '#00A8E8';
  ctx.strokeRect(28 * scale, 28 * scale, w - 56 * scale, h - 56 * scale);

  // Truck Art Corner Floral Rosettes
  const corners = [
    [35 * scale, 35 * scale],
    [w - 35 * scale, 35 * scale],
    [35 * scale, h - 35 * scale],
    [w - 35 * scale, h - 35 * scale],
  ];

  corners.forEach(([cx, cy]) => {
    ctx.save();
    ctx.translate(cx, cy);
    for (let i = 0; i < 8; i++) {
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.arc(0, 10 * scale, 4 * scale, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? '#F3C623' : '#D9381E';
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 6 * scale, 0, Math.PI * 2);
    ctx.fillStyle = '#00A8E8';
    ctx.fill();
    ctx.restore();
  });
}

// 2. AJRAK MINIMALIST FRAME
function drawAjrakFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  scale: number
) {
  ctx.fillStyle = '#0B1B3D';
  ctx.fillRect(0, 0, w, h);

  // Terracotta Red Inner Panel
  ctx.fillStyle = '#4A0D0D';
  ctx.fillRect(20 * scale, 20 * scale, w - 40 * scale, h - 40 * scale);

  // Gold Double Filigree Borders
  ctx.strokeStyle = '#C5A880';
  ctx.lineWidth = 3 * scale;
  ctx.strokeRect(28 * scale, 28 * scale, w - 56 * scale, h - 56 * scale);

  ctx.lineWidth = 1 * scale;
  ctx.strokeRect(34 * scale, 34 * scale, w - 68 * scale, h - 68 * scale);

  // Ajrak 8-Pointed Star Medallions at Corners
  const corners = [
    [40 * scale, 40 * scale],
    [w - 40 * scale, 40 * scale],
    [40 * scale, h - 40 * scale],
    [w - 40 * scale, h - 40 * scale],
  ];

  corners.forEach(([cx, cy]) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.fillStyle = '#F5F2EB';
    ctx.arc(0, 0, 12 * scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#A33B20';
    ctx.beginPath();
    ctx.arc(0, 0, 8 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

// 3. MODERN EMERALD WAVE FRAME
function drawEmeraldWaveFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  scale: number
) {
  const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 20 * scale, w / 2, h / 2, 320 * scale);
  bgGrad.addColorStop(0, '#01411C');
  bgGrad.addColorStop(0.7, '#012E17');
  bgGrad.addColorStop(1, '#001A0D');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Gold Archival Border
  ctx.strokeStyle = '#C5A880';
  ctx.lineWidth = 4 * scale;
  ctx.strokeRect(20 * scale, 20 * scale, w - 40 * scale, h - 40 * scale);

  // Top & Bottom Wave Accents
  ctx.save();
  ctx.strokeStyle = 'rgba(243, 198, 35, 0.4)';
  ctx.lineWidth = 1.8 * scale;

  ctx.beginPath();
  ctx.moveTo(20 * scale, 34 * scale);
  ctx.bezierCurveTo(w / 4, 44 * scale, (3 * w) / 4, 24 * scale, w - 20 * scale, 34 * scale);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20 * scale, h - 34 * scale);
  ctx.bezierCurveTo(w / 4, h - 44 * scale, (3 * w) / 4, h - 24 * scale, w - 20 * scale, h - 34 * scale);
  ctx.stroke();
  ctx.restore();
}

/* ========================================================================= */
/* UTILITY HELPERS                                                           */
/* ========================================================================= */

function drawCrescentStarMotif(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  color: string
) {
  ctx.save();
  ctx.fillStyle = color;

  // Crescent
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#012E17';
  ctx.beginPath();
  ctx.arc(cx + radius * 0.35, cy - radius * 0.2, radius * 0.8, 0, Math.PI * 2);
  ctx.fill();

  // Star
  ctx.fillStyle = '#F3C623';
  ctx.beginPath();
  ctx.arc(cx + radius * 0.55, cy - radius * 0.35, radius * 0.28, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: boolean,
  stroke: boolean
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

/**
 * Exports the badge as a high-resolution PNG file download (1200x1200px)
 */
export function exportBadgeAsPNG(
  options: BadgeOptions,
  filename?: string
): void {
  const nameSlug = (options.name || 'pakistan')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'pakistan';

  const finalFilename = filename || `echoes-patterns-79-badge-${nameSlug}.png`;

  // 1. High-Res 1200x1200px Offscreen Canvas
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = 1200;
  offscreenCanvas.height = 1200;

  // 2. Render badge
  drawKeepsakeBadge(offscreenCanvas, options);

  // 3. Blob Based Download (Direct PNG File)
  offscreenCanvas.toBlob((blob) => {
    if (!blob) {
      // Fallback agar toBlob fail ho
      const dataUrl = offscreenCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = finalFilename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = finalFilename;
    link.href = url;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 200);
  }, 'image/png');
}