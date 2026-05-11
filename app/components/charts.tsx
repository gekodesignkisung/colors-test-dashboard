'use client';

import React from 'react';
import type { DataPoint, SourceEntry } from '../data';

function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

// =========== AREA CHART ===========
export function AreaChart({ data, height = 240, color1 = "oklch(0.712 0.125 49.6)", color2 = "oklch(0.680 0.147 70.8)", showAxis = true, fmt = (v: number) => String(v) }: {
  data: DataPoint[];
  height?: number;
  color1?: string;
  color2?: string;
  showAxis?: boolean;
  fmt?: (v: number) => string;
}) {
  const [hover, setHover] = React.useState<number | null>(null);
  const ref = React.useRef<SVGSVGElement>(null);
  const W = 800, H = height;
  const padL = 44, padR = 18, padT = 16, padB = showAxis ? 28 : 8;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const max = Math.max(...data.map(d => d.value)) * 1.12;
  const min = 0;

  const points = data.map((d, i) => ({
    x: padL + (i / (data.length - 1)) * innerW,
    y: padT + innerH - ((d.value - min) / (max - min)) * innerH,
    d
  }));

  const pathLine = smoothPath(points);
  const pathArea = pathLine + ` L ${points[points.length - 1].x} ${padT + innerH} L ${points[0].x} ${padT + innerH} Z`;

  const yTicks = 4;
  const grid = Array.from({ length: yTicks + 1 }, (_, i) => {
    const y = padT + (i / yTicks) * innerH;
    const v = max - (i / yTicks) * (max - min);
    return { y, v };
  });

  const uid = React.useId();

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    let best = 0, bd = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - x);
      if (d < bd) { bd = d; best = i; }
    });
    setHover(best);
  };

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} width="100%" height={H}
         onMouseMove={onMove} onMouseLeave={() => setHover(null)}
         style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={`area-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"  stopColor={color1} stopOpacity={0.45}/>
          <stop offset="55%" stopColor={color2} stopOpacity={0.18}/>
          <stop offset="100%" stopColor={color2} stopOpacity={0}/>
        </linearGradient>
        <linearGradient id={`line-${uid}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={color1}/>
          <stop offset="100%" stopColor={color2}/>
        </linearGradient>
      </defs>

      {grid.map((g, i) => (
        <g key={i}>
          <line x1={padL} x2={W - padR} y1={g.y} y2={g.y} stroke="oklch(0.910 0.000 89.9)" strokeDasharray="3 4"/>
          {showAxis && (
            <text x={padL - 8} y={g.y + 4} fontSize="10" fill="oklch(0.531 0.002 106.5)" textAnchor="end" fontFamily="var(--font-num)">
              {fmt(Math.round(g.v))}
            </text>
          )}
        </g>
      ))}

      <path d={pathArea} fill={`url(#area-${uid})`}/>
      <path d={pathLine} fill="none" stroke={`url(#line-${uid})`} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>

      {showAxis && points.filter((_, i) => i % 5 === 0 || i === points.length - 1).map((p, i) => (
        <text key={i} x={p.x} y={H - 8} fontSize="10" fill="oklch(0.531 0.002 106.5)" textAnchor="middle" fontFamily="var(--font-num)">
          {p.d.label}
        </text>
      ))}

      {hover !== null && (
        <g>
          <line x1={points[hover].x} x2={points[hover].x} y1={padT} y2={padT + innerH}
                stroke="oklch(0.179 0.002 17.3)" strokeOpacity={0.15} strokeDasharray="3 3"/>
          <circle cx={points[hover].x} cy={points[hover].y} r="9" fill={color1} fillOpacity={0.18}/>
          <circle cx={points[hover].x} cy={points[hover].y} r="4.5" fill="white" stroke={color1} strokeWidth="2"/>
          <g transform={`translate(${Math.min(points[hover].x + 12, W - 130)}, ${Math.max(points[hover].y - 44, padT)})`}>
            <rect x="0" y="0" width="118" height="38" rx="8" fill="oklch(0.179 0.002 17.3)"/>
            <text x="10" y="15" fontSize="10" fill="oklch(0.630 0.000 89.9)" fontFamily="var(--font-ui)">{points[hover].d.label}</text>
            <text x="10" y="30" fontSize="13" fontWeight="600" fill="white" fontFamily="var(--font-num)">{fmt(points[hover].d.value)}</text>
          </g>
        </g>
      )}
    </svg>
  );
}

// =========== BAR CHART ===========
export function BarChart({ data, height = 240, c1 = "oklch(0.712 0.125 49.6)", c2 = "oklch(0.680 0.147 70.8)", fmt = (v: number) => String(v) }: {
  data: { label: string; value: number }[];
  height?: number;
  c1?: string;
  c2?: string;
  fmt?: (v: number) => string;
}) {
  const W = 800, H = height;
  const padL = 44, padR = 12, padT = 12, padB = 28;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const max = Math.max(...data.map(d => d.value)) * 1.12;
  const bw = innerW / data.length;
  const uid = React.useId();

  const grid = Array.from({ length: 5 }, (_, i) => {
    const y = padT + (i / 4) * innerH;
    return { y, v: max - (i / 4) * max };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`bar-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={c1}/>
          <stop offset="100%" stopColor={c2}/>
        </linearGradient>
      </defs>
      {grid.map((g, i) => (
        <g key={i}>
          <line x1={padL} x2={W - padR} y1={g.y} y2={g.y} stroke="oklch(0.910 0.000 89.9)" strokeDasharray="3 4"/>
          <text x={padL - 8} y={g.y + 4} fontSize="10" fill="oklch(0.531 0.002 106.5)" textAnchor="end" fontFamily="var(--font-num)">
            {fmt(Math.round(g.v))}
          </text>
        </g>
      ))}
      {data.map((d, i) => {
        const h = (d.value / max) * innerH;
        const x = padL + i * bw + bw * 0.18;
        const w = bw * 0.64;
        const y = padT + innerH - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx="5" fill={`url(#bar-${uid})`} opacity={0.92}/>
            <text x={x + w / 2} y={H - 10} fontSize="10" fill="oklch(0.531 0.002 106.5)" textAnchor="middle" fontFamily="var(--font-num)">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// =========== DONUT CHART ===========
export function DonutChart({ data, size = 200, thickness = 28 }: {
  data: SourceEntry[];
  size?: number;
  thickness?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = size / 2 - thickness / 2 - 4;
  const cx = size / 2, cy = size / 2;
  let acc = 0;
  const segs = data.map(d => {
    const start = acc / total;
    acc += d.value;
    const end = acc / total;
    return { ...d, start, end };
  });
  const arc = (s: number, e: number) => {
    const a1 = s * Math.PI * 2 - Math.PI / 2;
    const a2 = e * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const large = e - s > 0.5 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="oklch(0.946 0.032 55.4)" strokeWidth={thickness}/>
      {segs.map((s, i) => (
        <path key={i} d={arc(s.start + 0.005, s.end - 0.005)} stroke={s.color}
              strokeWidth={thickness} fill="none" strokeLinecap="round"/>
      ))}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fill="oklch(0.531 0.002 106.5)" fontFamily="var(--font-ui)">Total</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="22" fill="oklch(0.179 0.002 17.3)"
            fontFamily="var(--font-num)" fontWeight="600">{total.toLocaleString()}</text>
    </svg>
  );
}

// =========== SPARKLINE ===========
export function Sparkline({ data, color = "oklch(0.712 0.125 49.6)", w = 80, h = 28 }: {
  data: number[];
  color?: string;
  w?: number;
  h?: number;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / (max - min || 1)) * (h - 4) - 2
  }));
  const d = smoothPath(pts);
  const uid = React.useId();
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
      <defs>
        <linearGradient id={`sp-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.35}/>
          <stop offset="100%" stopColor={color} stopOpacity={0}/>
        </linearGradient>
      </defs>
      <path d={d + ` L ${w} ${h} L 0 ${h} Z`} fill={`url(#sp-${uid})`}/>
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2.5" fill={color}/>
    </svg>
  );
}

// =========== RADIAL PROGRESS ===========
export function RadialProgress({ value = 70, max = 100, size = 120, label, sub, color1 = "oklch(0.712 0.125 49.6)", color2 = "oklch(0.680 0.147 70.8)" }: {
  value?: number;
  max?: number;
  size?: number;
  label?: string;
  sub?: string;
  color1?: string;
  color2?: string;
}) {
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const off = c - (value / max) * c;
  const uid = React.useId();
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <defs>
          <linearGradient id={`rp-${uid}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={color1}/>
            <stop offset="100%" stopColor={color2}/>
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="oklch(0.946 0.032 55.4)" strokeWidth="9"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`url(#rp-${uid})`}
                strokeWidth="9" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
                transform={`rotate(-90 ${size/2} ${size/2})`}/>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center'
      }}>
        <div style={{ fontFamily: 'var(--font-num)', fontWeight: 600, fontSize: 28, lineHeight: 1 }}>
          {label}
        </div>
        {sub && <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>{sub}</div>}
      </div>
    </div>
  );
}

// =========== HEATMAP ===========
export function Heatmap({ data }: { data: number[][] }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hrs = ['12a','2a','4a','6a','8a','10a','12p','2p','4p','6p','8p','10p'];
  const mix = (t: number) => {
    const L = 0.946 + (0.653 - 0.946) * t;
    const C = 0.032 + (0.125 - 0.032) * t;
    const H = 55.4 + (50.1 - 55.4) * t;
    return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`;
  };
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 4 }}>
        {days.map(d => (
          <div key={d} style={{ height: 22, fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 500, display: 'flex', alignItems: 'center' }}>{d}</div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 22px)', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4 }}>
          {data.map((row, r) => row.map((v, c) => (
            <div key={`${r}-${c}`} title={`${days[r]} ${hrs[c]} — ${(v * 100).toFixed(0)}%`}
                 style={{
                   background: mix(v),
                   borderRadius: 4,
                   boxShadow: v > 0.7 ? '0 0 12px oklch(0.653 0.125 50.1 / 0.25)' : 'none'
                 }}/>
          )))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4, marginTop: 6 }}>
          {hrs.map(h => <div key={h} style={{ fontSize: 10, color: 'var(--ink-3)', textAlign: 'center', fontFamily: 'var(--font-num)' }}>{h}</div>)}
        </div>
      </div>
    </div>
  );
}
