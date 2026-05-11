'use client';

import React from 'react';
import { I } from '../icons';
import { Sparkline, AreaChart, DonutChart, RadialProgress } from '../charts';
import { revenueSeries, signupSeries, churnSeries, sourceData, geoData, activityFeed, planData, customers } from '../../data';

function KPI({ tint, icon: Ic, label, value, unit, delta, deltaUp, spark, sparkColor }: {
  tint: string;
  icon: (p: { size?: number; style?: React.CSSProperties }) => React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  delta: number;
  deltaUp: boolean;
  spark?: number[];
  sparkColor?: string;
}) {
  return (
    <div className={`kpi tinted-${tint}`}>
      <div className="kpi-head">
        <span className="kpi-label">{label}</span>
        <div className="kpi-icon"><Ic size={16} style={{ color: `var(--${tint}-600)` }}/></div>
      </div>
      <div className="kpi-value">
        <span className="serif-num">{value}</span>
        {unit && <span className="unit">{unit}</span>}
      </div>
      <div className="kpi-row">
        <span className={`kpi-delta ${deltaUp ? 'up' : 'down'}`}>
          {deltaUp ? <I.ArrowUp size={11}/> : <I.ArrowDown size={11}/>}
          {Math.abs(delta)}%
        </span>
        {spark && <div className="spark"><Sparkline data={spark} color={sparkColor} w={84} h={28}/></div>}
      </div>
    </div>
  );
}

export { KPI };

export default function OverviewPage() {
  const [range, setRange] = React.useState('30d');
  const [metric, setMetric] = React.useState('revenue');

  const series = metric === 'revenue' ? revenueSeries : signupSeries;
  const fmt = metric === 'revenue' ? (v: number) => `$${(v/1000).toFixed(0)}k` : (v: number) => v.toLocaleString();

  return (
    <div className="content">
      {/* HERO */}
      <div className="hero">
        <div className="between" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span className="live-dot"/>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Live · Last sync 12s ago</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 10px', maxWidth: 640 }}>
              Good afternoon, Hyojin.<br/>
              Your numbers are <span style={{ background: 'linear-gradient(120deg, var(--lilac-600), var(--butter-400))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>looking great</span> today.
            </h1>
            <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 14.5, maxWidth: 580 }}>
              Revenue is up <b style={{ color: 'var(--mint-600)' }}>↑ 18.4%</b> week-over-week, driven by a surge in Growth-plan upgrades from EU customers.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn"><I.Calendar size={14}/> May 11, 2026 · 30d</button>
            <button className="btn"><I.Download size={14}/> Export</button>
            <button className="btn btn-primary"><I.Sparkle size={14}/> Generate report</button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        <KPI tint="lilac" icon={I.Wallet} label="MRR"
             value="$312,860" delta={18.4} deltaUp
             spark={revenueSeries.slice(-12).map(r => r.value)} sparkColor="oklch(0.712 0.125 49.6)"/>
        <KPI tint="mint"  icon={I.Users}  label="Active customers"
             value="7,024" delta={4.6} deltaUp
             spark={signupSeries.slice(-12).map(r => r.value)} sparkColor="oklch(0.480 0.125 145.0)"/>
        <KPI tint="peach" icon={I.Pulse}  label="Churn rate" value="1.42" unit="%" delta={-0.6} deltaUp
             spark={churnSeries.slice(-12).map(r => r.value)} sparkColor="oklch(0.549 0.137 19.9)"/>
        <KPI tint="butter" icon={I.Zap}   label="Avg. session" value="14:32" delta={2.1} deltaUp
             spark={revenueSeries.slice(-12).map(r => r.value * 0.6)} sparkColor="oklch(0.680 0.147 70.8)"/>
      </div>

      {/* MAIN GRID */}
      <div className="grid-12">
        {/* Revenue chart */}
        <div className="card col-8">
          <div className="card-head">
            <div>
              <div className="card-title"><span className="dot"/> {metric === 'revenue' ? 'Revenue' : 'New signups'}</div>
              <div className="card-sub" style={{ marginTop: 2 }}>
                {metric === 'revenue' ? '$312,860 in last 30 days' : '8,420 new accounts'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div className="seg">
                <button className={metric === 'revenue' ? 'on' : ''} onClick={() => setMetric('revenue')}>Revenue</button>
                <button className={metric === 'signups' ? 'on' : ''} onClick={() => setMetric('signups')}>Signups</button>
              </div>
              <div className="seg">
                {['7d','30d','90d'].map(r => (
                  <button key={r} className={range === r ? 'on' : ''} onClick={() => setRange(r)}>{r}</button>
                ))}
              </div>
            </div>
          </div>
          <AreaChart
            data={range === '7d' ? series.slice(-7) : range === '90d' ? [...series, ...series.slice(0, 60)] : series}
            height={260}
            color1="oklch(0.712 0.125 49.6)" color2="oklch(0.680 0.147 70.8)"
            fmt={fmt}
          />
        </div>

        {/* Traffic source donut */}
        <div className="card col-4">
          <div className="card-head">
            <div>
              <div className="card-title">Traffic source</div>
              <div className="card-sub" style={{ marginTop: 2 }}>Last 30 days</div>
            </div>
            <button className="btn btn-ghost"><I.Dots size={16}/></button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <DonutChart data={sourceData} size={180}/>
            <div className="legend" style={{ flex: 1 }}>
              {sourceData.map(s => (
                <div key={s.name} className="legend-row">
                  <span className="legend-dot" style={{ background: s.color }}/>
                  <span className="legend-name">{s.name}</span>
                  <span className="legend-val">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geo */}
        <div className="card col-7">
          <div className="card-head">
            <div>
              <div className="card-title"><I.Globe size={15} style={{ color: 'var(--lilac-600)' }}/> Top regions</div>
              <div className="card-sub" style={{ marginTop: 2 }}>Active users by country</div>
            </div>
            <button className="btn btn-ghost">View all <I.ChevronRight size={14}/></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {geoData.slice(0, 6).map(g => (
              <div key={g.code} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  width: 30, height: 22, borderRadius: 5, background: g.color, opacity: 0.85,
                  display: 'grid', placeItems: 'center', fontSize: 9.5, fontWeight: 700, color: 'white',
                  letterSpacing: '0.05em', boxShadow: 'inset 0 1px 0 oklch(1.000 0.000 89.9 / 0.5)'
                }}>{g.code}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="between" style={{ marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{g.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                      <b style={{ color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{g.value.toLocaleString()}</b> · {g.share}%
                    </span>
                  </div>
                  <div className="bar"><span style={{ width: `${g.share * 2.5}%`, background: g.color }}/></div>
                </div>
                <span className={`kpi-delta ${g.trend === 'up' ? 'up' : 'down'}`} style={{ minWidth: 56, justifyContent: 'center' }}>
                  {g.trend === 'up' ? <I.ArrowUp size={10}/> : <I.ArrowDown size={10}/>} {Math.abs(g.delta)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="card col-5">
          <div className="card-head">
            <div>
              <div className="card-title">Recent activity</div>
              <div className="card-sub" style={{ marginTop: 2 }}>Realtime workspace events</div>
            </div>
            <span className="chip chip-mint"><span className="live-dot" style={{ width: 6, height: 6 }}/> Live</span>
          </div>
          <div className="activity">
            {activityFeed.map((a, i) => {
              const iconMap: Record<string, (p: { size?: number }) => React.ReactNode> = {
                signup: I.Plus, invoice: I.Card, flag: I.Bell, upgrade: I.ArrowUp, churn: I.X, feature: I.Sparkle
              };
              const Ic = iconMap[a.type];
              return (
                <div key={i} className="act-row">
                  <div className="act-ico" style={{
                    background: `var(--${a.tone}-100)`, color: `var(--${a.tone}-600)`
                  }}>
                    <Ic size={14}/>
                  </div>
                  <div className="act-body">
                    <div className="act-title"><b>{a.who}</b> {a.what}</div>
                    <div className="act-time">{a.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Plan distribution */}
        <div className="card col-4">
          <div className="card-head">
            <div>
              <div className="card-title">Plan breakdown</div>
              <div className="card-sub" style={{ marginTop: 2 }}>Active subscribers per plan</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {planData.map(p => {
              const total = planData.reduce((s, x) => s + x.users, 0);
              const pct = (p.users / total) * 100;
              return (
                <div key={p.name}>
                  <div className="between" style={{ marginBottom: 6 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color }}/>
                      {p.name}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                      <b style={{ color: 'var(--ink)' }}>{p.users.toLocaleString()}</b> · ${(p.revenue/1000).toFixed(0)}k MRR
                    </span>
                  </div>
                  <div className="bar"><span style={{ width: `${pct}%`, background: p.color }}/></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Goal radial */}
        <div className="card col-4" style={{ background: 'var(--grad-card-sky)' }}>
          <div className="card-head">
            <div>
              <div className="card-title">Q2 revenue goal</div>
              <div className="card-sub" style={{ marginTop: 2 }}>$1.2M target · 49 days left</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <RadialProgress value={73} max={100} size={130}
                            label="73%" sub="$876k of $1.2M"
                            color1="oklch(0.481 0.111 240.7)" color2="oklch(0.712 0.125 49.6)"/>
            <div style={{ flex: 1, fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.55 }}>
              On track to exceed goal by <b style={{ color: 'var(--sky-600)' }}>+8.4%</b> if current pace holds.
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="between"><span>Pace</span><b className="serif-num" style={{ fontSize: 16 }}>$18.2k/day</b></div>
                <div className="between"><span>Needed</span><b className="serif-num" style={{ fontSize: 16 }}>$6.6k/day</b></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top customers */}
        <div className="card col-4">
          <div className="card-head">
            <div>
              <div className="card-title">Top accounts</div>
              <div className="card-sub" style={{ marginTop: 2 }}>By MRR contribution</div>
            </div>
            <button className="btn btn-ghost"><I.ChevronRight size={14}/></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {customers.filter(c => c.status === 'Active').slice(0, 5).map(c => (
              <div key={c.id} className="between">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <span className="avatar" style={{ width: 32, height: 32, fontSize: 11, background: c.color }}>{c.avatar}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.company}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{c.plan} · {c.country}</div>
                  </div>
                </div>
                <span className="serif-num" style={{ fontSize: 17 }}>${c.mrr.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
