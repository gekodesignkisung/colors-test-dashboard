'use client';

import React from 'react';
import { I } from '../icons';
import { AreaChart, BarChart, RadialProgress, Heatmap } from '../charts';
import { signupSeries, topPages, heatmapData } from '../../data';

function Funnel() {
  const steps = [
    { name: 'Visited landing',      value: 142890, color: 'var(--lilac-100)', txt: 'var(--lilac-600)' },
    { name: 'Started signup',       value:  48210, color: 'var(--peach-100)', txt: 'var(--peach-600)' },
    { name: 'Verified email',       value:  31840, color: 'var(--mint-100)',  txt: 'var(--mint-600)' },
    { name: 'Connected source',     value:  18470, color: 'var(--sky-100)',   txt: 'var(--sky-600)' },
    { name: 'Activated workspace',  value:   9770, color: 'var(--rose-100)',  txt: 'var(--rose-600)' },
  ];
  const max = steps[0].value;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {steps.map((s, i) => {
        const w = (s.value / max) * 100;
        const prev = i === 0 ? null : steps[i - 1];
        const dropoff = prev ? (1 - s.value / prev.value) * 100 : 0;
        return (
          <div key={s.name}>
            <div className="between" style={{ marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-num)', color: 'var(--ink-3)', fontSize: 11, fontWeight: 600, width: 18 }}>{String(i + 1).padStart(2, '0')}</span>
                {s.name}
              </span>
              <span style={{ fontSize: 12, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 10 }}>
                {i > 0 && <span style={{ color: 'var(--peach-600)', fontSize: 11 }}>↓ {dropoff.toFixed(1)}% drop</span>}
                <b style={{ color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{s.value.toLocaleString()}</b>
              </span>
            </div>
            <div style={{
              height: 36, background: s.color, borderRadius: 8, width: `${w}%`,
              display: 'flex', alignItems: 'center', padding: '0 14px', color: s.txt,
              fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-num)',
              boxShadow: 'inset 0 1px 0 oklch(1.000 0.000 89.9 / 0.6)',
              transition: 'width 0.4s var(--ease)'
            }}>
              {((s.value / max) * 100).toFixed(1)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AnalyticsPage() {
  const [tab, setTab] = React.useState('audience');
  const [filters, setFilters] = React.useState({ device: 'all', region: 'all', source: 'all' });

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <h1>Analytics <em>insights</em></h1>
          <div className="sub">Deep-dive into product engagement and conversion behavior.</div>
        </div>
        <div className="head-actions">
          <div className="seg">
            {['audience','behavior','conversion','retention'].map(t => (
              <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <button className="btn"><I.Download size={14}/> Export CSV</button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <I.Filter size={14} style={{ color: 'var(--ink-3)' }}/>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)', marginRight: 4 }}>Filters</span>

        {[
          { key: 'device', label: 'Device', options: ['all', 'desktop', 'mobile', 'tablet'] },
          { key: 'region', label: 'Region', options: ['all', 'na', 'eu', 'apac', 'latam'] },
          { key: 'source', label: 'Source', options: ['all', 'organic', 'paid', 'social', 'referral'] },
        ].map(f => (
          <div key={f.key} style={{ display: 'flex', gap: 4 }}>
            {f.options.map(o => (
              <button key={o}
                      className={`filter-pill ${filters[f.key as keyof typeof filters] === o ? 'on' : ''}`}
                      onClick={() => setFilters(p => ({ ...p, [f.key]: o }))}>
                {o === 'all' ? `All ${f.label.toLowerCase()}` : o}
              </button>
            ))}
            <span style={{ width: 1, background: 'var(--border)', margin: '0 6px' }}/>
          </div>
        ))}

        <button className="btn btn-ghost" style={{ marginLeft: 'auto' }}>
          <I.Refresh size={14}/> Reset
        </button>
      </div>

      <div className="grid-12">
        {/* Big traffic chart */}
        <div className="card col-12">
          <div className="card-head">
            <div>
              <div className="card-title">Visitor sessions <span className="chip chip-mint">+24.6% vs last period</span></div>
              <div className="card-sub" style={{ marginTop: 4 }}>Unique visitors and total sessions, hourly aggregated</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="chip chip-lilac"><span style={{ width: 8, height: 8, background: 'var(--lilac-400)', borderRadius: 2, display: 'inline-block' }}/> Sessions</span>
              <span className="chip chip-peach"><span style={{ width: 8, height: 8, background: 'var(--peach-400)', borderRadius: 2, display: 'inline-block' }}/> Unique visitors</span>
              <button className="btn btn-ghost"><I.Dots size={16}/></button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 32, marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>Sessions</div>
              <div className="serif-num" style={{ fontSize: 38 }}>1,284,920</div>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>Visitors</div>
              <div className="serif-num" style={{ fontSize: 38 }}>841,202</div>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>Bounce</div>
              <div className="serif-num" style={{ fontSize: 38 }}>34.2<span style={{ fontSize: 18, color: 'var(--ink-3)', fontFamily: 'var(--font-ui)' }}>%</span></div>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>Avg duration</div>
              <div className="serif-num" style={{ fontSize: 38 }}>3:42</div>
            </div>
          </div>
          <AreaChart data={signupSeries} height={280} color1="oklch(0.712 0.125 49.6)" color2="oklch(0.680 0.147 70.8)" fmt={(v) => v.toLocaleString()}/>
        </div>

        {/* Funnel */}
        <div className="card col-7">
          <div className="card-head">
            <div>
              <div className="card-title">Conversion funnel</div>
              <div className="card-sub" style={{ marginTop: 2 }}>From landing → activation</div>
            </div>
            <span className="chip chip-lilac">Avg conv 6.84%</span>
          </div>
          <Funnel/>
        </div>

        {/* Top pages */}
        <div className="card col-5">
          <div className="card-head">
            <div>
              <div className="card-title">Top pages</div>
              <div className="card-sub" style={{ marginTop: 2 }}>Visits in selected period</div>
            </div>
            <button className="btn btn-ghost"><I.External size={14}/></button>
          </div>
          <table className="tbl" style={{ marginTop: -8 }}>
            <thead><tr><th>Path</th><th style={{ textAlign: 'right' }}>Visits</th><th style={{ textAlign: 'right' }}>Δ</th></tr></thead>
            <tbody>
              {topPages.map(p => (
                <tr key={p.path}>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{p.path}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>avg {p.avgTime}</div>
                  </td>
                  <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{p.visits.toLocaleString()}</td>
                  <td style={{ textAlign: 'right' }}>
                    <span className={`kpi-delta ${p.change >= 0 ? 'up' : 'down'}`}>
                      {p.change >= 0 ? <I.ArrowUp size={10}/> : <I.ArrowDown size={10}/>}
                      {Math.abs(p.change)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Heatmap */}
        <div className="card col-8">
          <div className="card-head">
            <div>
              <div className="card-title">Feature usage heatmap</div>
              <div className="card-sub" style={{ marginTop: 2 }}>When users are most engaged · last 7 days · UTC</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: 'var(--ink-3)' }}>
              Less
              <div style={{ display: 'flex', gap: 3 }}>
                {[0.1, 0.3, 0.55, 0.8, 1].map((v, i) => (
                  <span key={i} style={{ width: 12, height: 12, borderRadius: 3,
                    background: `oklch(${(0.946 + (0.653 - 0.946) * v).toFixed(3)} ${(0.032 + (0.125 - 0.032) * v).toFixed(3)} ${(55.4 + (50.1 - 55.4) * v).toFixed(1)})` }}/>
                ))}
              </div>
              More
            </div>
          </div>
          <Heatmap data={heatmapData}/>
        </div>

        {/* Retention */}
        <div className="card col-4" style={{ background: 'var(--grad-card-mint)' }}>
          <div className="card-head">
            <div>
              <div className="card-title">7-day retention</div>
              <div className="card-sub" style={{ marginTop: 2 }}>Cohort: Apr 28 → May 4</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 12px' }}>
            <RadialProgress value={68.4} max={100} size={150}
                            label="68.4%" sub="vs 61.2% prev cohort"
                            color1="oklch(0.480 0.125 145.0)" color2="oklch(0.481 0.111 240.7)"/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {[100, 72, 58, 48, 42, 38, 34.5].map((v, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  height: v * 0.7, background: `var(--mint-${i < 2 ? '400' : i < 4 ? '200' : '100'})`,
                  borderRadius: 4, marginTop: 70 - v * 0.7, opacity: 1 - i * 0.05
                }}/>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 4 }}>D{i}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Browser breakdown */}
        <div className="card col-6">
          <div className="card-head">
            <div>
              <div className="card-title">Device & browser mix</div>
              <div className="card-sub" style={{ marginTop: 2 }}>Last 30 days</div>
            </div>
          </div>
          <BarChart
            data={[
              { label: 'Chrome', value: 5240 },
              { label: 'Safari', value: 3120 },
              { label: 'Firefox', value: 1180 },
              { label: 'Edge', value: 840 },
              { label: 'Arc', value: 420 },
              { label: 'Other', value: 280 },
            ]}
            height={220}
            c1="oklch(0.712 0.125 49.6)" c2="oklch(0.680 0.147 70.8)"
            fmt={(v) => v.toLocaleString()}
          />
        </div>

        {/* AI Insight card */}
        <div className="card col-6" style={{
          background: 'linear-gradient(135deg, oklch(0.179 0.002 17.3) 0%, oklch(0.250 0.060 50.0) 100%)', color: 'white', border: 'none', overflow: 'hidden', position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 220, height: 220,
            background: 'var(--grad-iridescent)', filter: 'blur(60px)', opacity: 0.35
          }}/>
          <div style={{ position: 'relative' }}>
            <div className="card-head">
              <div>
                <div className="card-title" style={{ color: 'white' }}>
                  <I.Sparkle size={15} style={{ color: 'var(--lilac-200)' }}/> AI insights
                </div>
                <div style={{ fontSize: 12, color: 'oklch(1.000 0.000 89.9 / 0.6)', marginTop: 2 }}>Generated 4 minutes ago</div>
              </div>
              <span className="chip" style={{ background: 'oklch(1.000 0.000 89.9 / 0.1)', color: 'oklch(1.000 0.000 89.9 / 0.9)' }}>Beta</span>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: 20, lineHeight: 1.3, margin: '0 0 10px', letterSpacing: '-0.02em'
            }}>
              &ldquo;Your <span style={{ background: 'var(--grad-iridescent)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Growth → Scale</span> upgrade rate jumped 42% this week.&rdquo;
            </h3>
            <p style={{ fontSize: 13, color: 'oklch(1.000 0.000 89.9 / 0.75)', lineHeight: 1.55, margin: '0 0 16px' }}>
              The new analytics export feature shipped May 4 correlates with a sharp lift in upgrades from teams over 12 seats. Consider adding it to the Growth plan upsell email.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" style={{ background: 'white', borderColor: 'white' }}>
                <I.Eye size={14}/> See evidence
              </button>
              <button className="btn" style={{ background: 'transparent', borderColor: 'oklch(1.000 0.000 89.9 / 0.2)', color: 'white' }}>
                <I.Sparkle size={14}/> Ask follow-up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
