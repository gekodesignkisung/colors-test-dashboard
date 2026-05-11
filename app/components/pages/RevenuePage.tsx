'use client';

import React from 'react';
import { I } from '../icons';
import { AreaChart, BarChart } from '../charts';
import { revenueSeries, churnSeries, planData } from '../../data';
import { KPI } from './OverviewPage';

export default function RevenuePage() {
  const total = revenueSeries.reduce((s, r) => s + r.value, 0);
  return (
    <div className="content">
      <div className="page-head">
        <div>
          <h1>Revenue <em>health</em></h1>
          <div className="sub">Monitor MRR, expansion, and churn across all plans.</div>
        </div>
        <div className="head-actions">
          <button className="btn"><I.Calendar size={14}/> May 2026</button>
          <button className="btn btn-primary"><I.Download size={14}/> Export P&amp;L</button>
        </div>
      </div>

      <div className="kpi-grid">
        <KPI tint="lilac" icon={I.Wallet} label="Net MRR"        value="$312,860" delta={18.4} deltaUp spark={revenueSeries.slice(-12).map(r => r.value)} sparkColor="oklch(0.712 0.125 49.6)"/>
        <KPI tint="mint"  icon={I.ArrowUp} label="New MRR"       value="$42,180"  delta={22.1} deltaUp spark={revenueSeries.slice(-12).map(r => r.value * 0.18)} sparkColor="oklch(0.480 0.125 145.0)"/>
        <KPI tint="peach" icon={I.ArrowDown} label="Churned MRR" value="$6,420"   delta={-3.2} deltaUp spark={revenueSeries.slice(-12).map(r => r.value * 0.04)} sparkColor="oklch(0.549 0.137 19.9)"/>
        <KPI tint="butter" icon={I.Bolt} label="Expansion MRR"   value="$18,910"  delta={9.6}  deltaUp spark={revenueSeries.slice(-12).map(r => r.value * 0.08)} sparkColor="oklch(0.680 0.147 70.8)"/>
      </div>

      <div className="grid-12">
        <div className="card col-12">
          <div className="card-head">
            <div>
              <div className="card-title">Monthly recurring revenue</div>
              <div className="card-sub" style={{ marginTop: 2 }}>Cumulative ${total.toLocaleString()} over 30 days</div>
            </div>
          </div>
          <AreaChart data={revenueSeries} height={300} color1="oklch(0.712 0.125 49.6)" color2="oklch(0.680 0.147 70.8)" fmt={(v) => `$${(v/1000).toFixed(0)}k`}/>
        </div>

        <div className="card col-6">
          <div className="card-head">
            <div className="card-title">Plan breakdown</div>
            <div className="card-sub">By revenue contribution</div>
          </div>
          <BarChart data={planData.map(p => ({ label: p.name, value: p.revenue }))} c1="oklch(0.481 0.111 240.7)" c2="oklch(0.712 0.125 49.6)" fmt={(v) => `$${(v/1000).toFixed(0)}k`}/>
        </div>

        <div className="card col-6" style={{ background: 'var(--grad-card-mint)' }}>
          <div className="card-head">
            <div className="card-title">Churn rate</div>
            <div className="card-sub">30-day rolling</div>
          </div>
          <AreaChart data={churnSeries} height={220} color1="oklch(0.480 0.125 145.0)" color2="oklch(0.481 0.111 240.7)" fmt={(v) => `${v}%`}/>
        </div>
      </div>
    </div>
  );
}
