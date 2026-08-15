'use client';

import React, { useEffect, useRef } from 'react';

export type RegionId = 'punjab' | 'sindh' | 'kpk' | 'balochistan' | 'gb_kashmir';

interface RegionCanvasPatternProps {
  regionId: RegionId;
  className?: string;
  animate?: boolean;
}

export default function RegionCanvasPattern({
  regionId,
  className = '',
  animate = true,
}: RegionCanvasPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      time += 0.015;

      switch (regionId) {
        case 'punjab':
          drawMultaniTilePattern(ctx, width, height, cx, cy, animate ? time : 0);
          break;
        case 'sindh':
          drawAjrakBlockPattern(ctx, width, height, cx, cy, animate ? time : 0);
          break;
        case 'kpk':
          drawCopperAcousticPattern(ctx, width, height, cx, cy, animate ? time : 0);
          break;
        case 'balochistan':
          drawBalochiNeedleworkPattern(ctx, width, height, cx, cy, animate ? time : 0);
          break;
        case 'gb_kashmir':
          drawKashmirPashminaPattern(ctx, width, height, cx, cy, animate ? time : 0);
          break;
      }

      if (animate) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Resize canvas to match display size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (rect.width || 300) * dpr;
      canvas.height = (rect.height || 300) * dpr;
      ctx.scale(dpr, dpr);
      render();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [regionId, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full object-cover rounded-xl ${className}`}
    />
  );
}

/* ========================================================================= */
/* REGIONAL PROCEDURAL CANVASES                                              */
/* ========================================================================= */

// 1. PUNJAB: Multani Blue Pottery & Radial Star Rosette Tile
function drawMultaniTilePattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  cx: number,
  cy: number,
  t: number
) {
  const scale = Math.min(w, h) / 320;
  ctx.save();
  ctx.translate(cx, cy);

  // Background glazed blue glow
  const bgGrad = ctx.createRadialGradient(0, 0, 10 * scale, 0, 0, 150 * scale);
  bgGrad.addColorStop(0, '#005B82');
  bgGrad.addColorStop(0.7, '#002B45');
  bgGrad.addColorStop(1, '#011A2B');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(-cx, -cy, w, h);

  // 8-Pointed Star Rosette
  const petals = 8;
  const rot = t * 0.2;

  ctx.rotate(rot);

  // Outer Petal Layer
  for (let i = 0; i < petals; i++) {
    const angle = (i * 2 * Math.PI) / petals;
    ctx.save();
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(30 * scale, 70 * scale, 0, 120 * scale);
    ctx.quadraticCurveTo(-30 * scale, 70 * scale, 0, 0);
    ctx.fillStyle = i % 2 === 0 ? 'rgba(0, 168, 232, 0.4)' : 'rgba(245, 242, 235, 0.25)';
    ctx.fill();

    ctx.strokeStyle = '#C5A880';
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    // Inner floral accent
    ctx.beginPath();
    ctx.arc(0, 75 * scale, 8 * scale, 0, Math.PI * 2);
    ctx.fillStyle = '#F3C623';
    ctx.fill();
    ctx.restore();
  }

  // Center Core Glaze
  ctx.beginPath();
  ctx.arc(0, 0, 32 * scale, 0, Math.PI * 2);
  ctx.fillStyle = '#005B82';
  ctx.fill();
  ctx.strokeStyle = '#F5F2EB';
  ctx.lineWidth = 2 * scale;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, 16 * scale, 0, Math.PI * 2);
  ctx.fillStyle = '#F3C623';
  ctx.fill();

  ctx.restore();
}

// 2. SINDH: Ajrak Block Print & Geometric Star Grid Motif
function drawAjrakBlockPattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  cx: number,
  cy: number,
  t: number
) {
  const scale = Math.min(w, h) / 320;
  ctx.save();

  // Ajrak Deep Terracotta / Indigo base
  ctx.fillStyle = '#A33B20';
  ctx.fillRect(0, 0, w, h);

  const tileSize = 60 * scale;
  const shift = (t * 10) % tileSize;

  ctx.strokeStyle = '#F5F2EB';
  ctx.lineWidth = 1 * scale;

  for (let x = -tileSize; x < w + tileSize; x += tileSize) {
    for (let y = -tileSize; y < h + tileSize; y += tileSize) {
      const px = x + shift * 0.3;
      const py = y + shift * 0.3;

      ctx.save();
      ctx.translate(px, py);

      // Outer Ajrak Block Square
      ctx.fillStyle = '#0B1B3D';
      ctx.fillRect(4 * scale, 4 * scale, tileSize - 8 * scale, tileSize - 8 * scale);

      // Trefoil / 4-Pointed Star motif inside block
      ctx.beginPath();
      ctx.moveTo(tileSize / 2, 8 * scale);
      ctx.lineTo(tileSize - 8 * scale, tileSize / 2);
      ctx.lineTo(tileSize / 2, tileSize - 8 * scale);
      ctx.lineTo(8 * scale, tileSize / 2);
      ctx.closePath();
      ctx.fillStyle = 'rgba(245, 242, 235, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#C5A880';
      ctx.stroke();

      // Center White Dot
      ctx.beginPath();
      ctx.arc(tileSize / 2, tileSize / 2, 4 * scale, 0, Math.PI * 2);
      ctx.fillStyle = '#F5F2EB';
      ctx.fill();

      ctx.restore();
    }
  }

  ctx.restore();
}

// 3. KPK: Peshawari Chased Copper Medallion & Acoustic Resonance Rings
function drawCopperAcousticPattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  cx: number,
  cy: number,
  t: number
) {
  const scale = Math.min(w, h) / 320;
  ctx.save();
  ctx.translate(cx, cy);

  // Background Aged Bronze gradient
  const bgGrad = ctx.createRadialGradient(0, 0, 5 * scale, 0, 0, 160 * scale);
  bgGrad.addColorStop(0, '#5A4010');
  bgGrad.addColorStop(0.6, '#3A2708');
  bgGrad.addColorStop(1, '#012E17');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(-cx, -cy, w, h);

  // Concentric Acoustic Sound Waves (Rabab instrument motif)
  const ringCount = 7;
  for (let r = 1; r <= ringCount; r++) {
    const radius = r * 18 * scale + Math.sin(t * 2 + r) * 4 * scale;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.strokeStyle = r % 2 === 0 ? '#C5A880' : '#F3C623';
    ctx.lineWidth = (1.5 + Math.sin(t + r) * 0.8) * scale;
    ctx.globalAlpha = 0.3 + (r / ringCount) * 0.5;
    ctx.stroke();
  }

  ctx.globalAlpha = 1.0;

  // Chased Copper Radial Spokes
  const spokes = 12;
  ctx.rotate(-t * 0.15);

  for (let i = 0; i < spokes; i++) {
    const angle = (i * 2 * Math.PI) / spokes;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(15 * scale, 0);
    ctx.lineTo(110 * scale, 0);
    ctx.strokeStyle = 'rgba(197, 168, 128, 0.4)';
    ctx.lineWidth = 1 * scale;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(110 * scale, 0, 3 * scale, 0, Math.PI * 2);
    ctx.fillStyle = '#F3C623';
    ctx.fill();
    ctx.restore();
  }

  // Central Copper Boss
  ctx.beginPath();
  ctx.arc(0, 0, 20 * scale, 0, Math.PI * 2);
  ctx.fillStyle = '#C5A880';
  ctx.fill();
  ctx.strokeStyle = '#F3C623';
  ctx.lineWidth = 2 * scale;
  ctx.stroke();

  ctx.restore();
}

// 4. BALOCHISTAN: Balochi Needlework Mirrorwork Diamond Lattice
function drawBalochiNeedleworkPattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  cx: number,
  cy: number,
  t: number
) {
  const scale = Math.min(w, h) / 320;
  ctx.save();

  // Vivid Balochi Crimson background
  ctx.fillStyle = '#4A0D0D';
  ctx.fillRect(0, 0, w, h);

  const grid = 50 * scale;
  const pulse = Math.sin(t * 3) * 2 * scale;

  for (let x = 0; x < w + grid; x += grid) {
    for (let y = 0; y < h + grid; y += grid) {
      ctx.save();
      ctx.translate(x, y);

      // Diamond Stitch Frame
      ctx.beginPath();
      ctx.moveTo(grid / 2, 0);
      ctx.lineTo(grid, grid / 2);
      ctx.lineTo(grid / 2, grid);
      ctx.lineTo(0, grid / 2);
      ctx.closePath();

      ctx.fillStyle = 'rgba(217, 56, 30, 0.4)';
      ctx.fill();
      ctx.strokeStyle = '#F3C623';
      ctx.lineWidth = 2 * scale;
      ctx.setLineDash([4 * scale, 2 * scale]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Mirrorwork Silver Circle in center
      ctx.beginPath();
      ctx.arc(grid / 2, grid / 2, (8 * scale) + pulse, 0, Math.PI * 2);
      const mirrorGrad = ctx.createRadialGradient(
        grid / 2 - 2,
        grid / 2 - 2,
        1,
        grid / 2,
        grid / 2,
        8 * scale
      );
      mirrorGrad.addColorStop(0, '#FFFFFF');
      mirrorGrad.addColorStop(0.7, '#D0D5DD');
      mirrorGrad.addColorStop(1, '#00A8E8');
      ctx.fillStyle = mirrorGrad;
      ctx.fill();
      ctx.strokeStyle = '#F5F2EB';
      ctx.lineWidth = 1 * scale;
      ctx.stroke();

      ctx.restore();
    }
  }

  ctx.restore();
}

// 5. GB & KASHMIR: Walnut Wood Carving Lattice & Pashmina Paisley Weave
function drawKashmirPashminaPattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  cx: number,
  cy: number,
  t: number
) {
  const scale = Math.min(w, h) / 320;
  ctx.save();
  ctx.translate(cx, cy);

  // Deep Emerald & Walnut Forest gradient
  const bgGrad = ctx.createRadialGradient(0, 0, 10 * scale, 0, 0, 160 * scale);
  bgGrad.addColorStop(0, '#01411C');
  bgGrad.addColorStop(0.7, '#012E17');
  bgGrad.addColorStop(1, '#001A0D');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(-cx, -cy, w, h);

  // Paisley / Boteh Curved Motif
  const paisleyCount = 5;
  const rot = t * 0.1;

  ctx.rotate(rot);

  for (let i = 0; i < paisleyCount; i++) {
    const angle = (i * 2 * Math.PI) / paisleyCount;
    ctx.save();
    ctx.rotate(angle);

    // Curved Paisley Leaf
    ctx.beginPath();
    ctx.moveTo(0, 20 * scale);
    ctx.bezierCurveTo(50 * scale, 50 * scale, 80 * scale, 100 * scale, 20 * scale, 120 * scale);
    ctx.bezierCurveTo(-30 * scale, 90 * scale, -10 * scale, 50 * scale, 0, 20 * scale);

    ctx.fillStyle = i % 2 === 0 ? 'rgba(197, 168, 128, 0.25)' : 'rgba(245, 242, 235, 0.15)';
    ctx.fill();
    ctx.strokeStyle = '#C5A880';
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    // Pashmina Fine Line Weave
    for (let wLine = 30; wLine <= 90; wLine += 15) {
      ctx.beginPath();
      ctx.arc(0, wLine * scale, 4 * scale, 0, Math.PI * 2);
      ctx.fillStyle = '#F3C623';
      ctx.fill();
    }

    ctx.restore();
  }

  // Interlocking Walnut Wood Lattice Ring
  ctx.beginPath();
  ctx.arc(0, 0, 50 * scale, 0, Math.PI * 2);
  ctx.strokeStyle = '#C5A880';
  ctx.lineWidth = 2 * scale;
  ctx.setLineDash([6 * scale, 4 * scale]);
  ctx.stroke();

  ctx.restore();
}
