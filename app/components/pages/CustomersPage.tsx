'use client';

import React from 'react';
import { I } from '../icons';
import { Sparkline } from '../charts';
import { customers, signupSeries } from '../../data';
import { KPI } from './OverviewPage';

function planTone(plan: string) {
  return ({ Starter: 'sky', Growth: 'lilac', Scale: 'peach', Enterprise: 'mint' } as Record<string, string>)[plan] || 'lilac';
}

export default function CustomersPage({ query }: { query: string }) {
  const [status, setStatus] = React.useState('all');
  const [plan, setPlan] = React.useState('all');
  const [sort, setSort] = React.useState('mrr-desc');
  const [selected, setSelected] = React.useState(customers[0].id);
  const [view, setView] = React.useState('table');

  const filtered = React.useMemo(() => {
    let list = customers.filter(c => {
      if (status !== 'all' && c.status.toLowerCase() !== status) return false;
      if (plan !== 'all' && c.plan.toLowerCase() !== plan) return false;
      if (query) {
        const q = query.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
      }
      return true;
    });
    const sorters: Record<string, (a: typeof customers[0], b: typeof customers[0]) => number> = {
      'mrr-desc': (a, b) => b.mrr - a.mrr,
      'mrr-asc':  (a, b) => a.mrr - b.mrr,
      'name':     (a, b) => a.name.localeCompare(b.name),
      'recent':   (a, b) => b.joined.localeCompare(a.joined),
    };
    return list.sort(sorters[sort]);
  }, [status, plan, sort, query]);

  const selectedCustomer = customers.find(c => c.id === selected) || customers[0];

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <h1>Customers <em>directory</em></h1>
          <div className="sub">{customers.length} accounts · {customers.filter(c => c.status === 'Active').length} active · ${customers.reduce((s, c) => s + c.mrr, 0).toLocaleString()} MRR</div>
        </div>
        <div className="head-actions">
          <button className="btn"><I.Download size={14}/> Export</button>
          <button className="btn btn-primary"><I.Plus size={14}/> Invite customer</button>
        </div>
      </div>

      <div className="kpi-grid">
        <KPI tint="lilac"  icon={I.Users}  label="Total customers" value="7,024" delta={4.6} deltaUp spark={signupSeries.slice(-12).map(s => s.value)} sparkColor="oklch(0.712 0.125 49.6)"/>
        <KPI tint="mint"   icon={I.Heart}  label="Active rate" value="94.2" unit="%" delta={1.8} deltaUp spark={[80, 82, 81, 84, 85, 87, 89, 88, 90, 91, 93, 94]} sparkColor="oklch(0.480 0.125 145.0)"/>
        <KPI tint="peach"  icon={I.Star}   label="NPS score" value="64" delta={3} deltaUp spark={[55, 56, 58, 57, 60, 61, 62, 60, 62, 63, 64, 64]} sparkColor="oklch(0.549 0.137 19.9)"/>
        <KPI tint="butter" icon={I.Bolt}   label="Trial → paid" value="42" unit="%" delta={5.4} deltaUp spark={[30, 32, 34, 33, 36, 35, 38, 39, 40, 41, 41, 42]} sparkColor="oklch(0.680 0.147 70.8)"/>
      </div>

      <div className="filter-bar">
        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)' }}>Status</span>
        {['all', 'active', 'trial', 'churned'].map(s => (
          <button key={s} className={`filter-pill ${status === s ? 'on' : ''}`} onClick={() => setStatus(s)}>
            {s === 'all' ? 'Everyone' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <span style={{ width: 1, background: 'var(--border)', margin: '0 6px', alignSelf: 'stretch' }}/>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)' }}>Plan</span>
        {['all', 'starter', 'growth', 'scale', 'enterprise'].map(p => (
          <button key={p} className={`filter-pill ${plan === p ? 'on' : ''}`} onClick={() => setPlan(p)}>
            {p === 'all' ? 'Any' : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <select className="select" style={{ width: 160 }} value={sort} onChange={e => setSort(e.target.value)}>
            <option value="mrr-desc">Sort: MRR (high → low)</option>
            <option value="mrr-asc">Sort: MRR (low → high)</option>
            <option value="name">Sort: Name (A–Z)</option>
            <option value="recent">Sort: Recently joined</option>
          </select>
          <div className="seg">
            <button className={view === 'table' ? 'on' : ''} onClick={() => setView('table')}><I.Layers size={13}/></button>
            <button className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')}><I.ChartBar size={13}/></button>
          </div>
        </div>
      </div>

      <div className="grid-12">
        <div className="card col-8" style={{ padding: 0, overflow: 'hidden' }}>
          {view === 'table' ? (
            <table className="tbl">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>MRR</th>
                  <th>Joined</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} onClick={() => setSelected(c.id)}
                      style={{ cursor: 'pointer', background: c.id === selected ? 'var(--surface-2)' : 'transparent' }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="avatar" style={{ width: 30, height: 30, fontSize: 11, background: c.color }}>{c.avatar}</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`chip chip-${planTone(c.plan)}`}>{c.plan}</span>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 12.5, fontWeight: 500 }}>
                        <span className="status-dot" style={{
                          background: c.status === 'Active' ? 'var(--mint-400)'
                                    : c.status === 'Trial'  ? 'var(--butter-400)'
                                    : 'var(--peach-400)'
                        }}/>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                      ${c.mrr.toLocaleString()}
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-num)' }}>{c.joined}</td>
                    <td><button className="btn btn-ghost" style={{ padding: 4 }}><I.Dots size={16}/></button></td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--ink-3)' }}>
                    No customers match the filters.
                  </td></tr>
                )}
              </tbody>
            </table>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, padding: 16 }}>
              {filtered.map(c => (
                <div key={c.id} onClick={() => setSelected(c.id)}
                     style={{
                       border: `1px solid ${c.id === selected ? 'var(--lilac-200)' : 'var(--border)'}`,
                       borderRadius: 14, padding: 14, cursor: 'pointer',
                       background: c.id === selected ? 'var(--lilac-50)' : 'var(--surface)'
                     }}>
                  <div className="between" style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className="avatar" style={{ background: c.color }}>{c.avatar}</span>
                      <div>
                        <div style={{ fontWeight: 600 }}>{c.company}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{c.name} · {c.country}</div>
                      </div>
                    </div>
                    <span className={`chip chip-${planTone(c.plan)}`}>{c.plan}</span>
                  </div>
                  <div className="between">
                    <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{c.status} since {c.joined}</span>
                    <span className="serif-num" style={{ fontSize: 18 }}>${c.mrr.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{
            padding: '12px 18px', borderTop: '1px solid var(--border)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--ink-3)'
          }}>
            <span>Showing <b style={{ color: 'var(--ink)' }}>{filtered.length}</b> of {customers.length}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn btn-ghost" style={{ padding: '4px 10px' }}>Previous</button>
              <button className="btn" style={{ padding: '4px 10px' }}>1</button>
              <button className="btn btn-ghost" style={{ padding: '4px 10px' }}>2</button>
              <button className="btn btn-ghost" style={{ padding: '4px 10px' }}>3</button>
              <button className="btn btn-ghost" style={{ padding: '4px 10px' }}>Next</button>
            </div>
          </div>
        </div>

        <div className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ background: 'var(--grad-card-hero)', padding: 0, overflow: 'hidden' }}>
            <div style={{ height: 70, background: 'var(--grad-iridescent)', opacity: 0.55, position: 'relative' }}>
              <button className="btn btn-ghost" style={{ position: 'absolute', top: 8, right: 8, background: 'oklch(1.000 0.000 89.9 / 0.6)' }}>
                <I.Dots size={16}/>
              </button>
            </div>
            <div style={{ padding: '0 20px 20px', marginTop: -28 }}>
              <span className="avatar" style={{
                width: 56, height: 56, fontSize: 18, background: selectedCustomer.color,
                border: '3px solid white', boxShadow: 'var(--shadow-md)'
              }}>{selectedCustomer.avatar}</span>
              <h3 style={{ margin: '12px 0 2px', fontSize: 18, fontWeight: 600 }}>{selectedCustomer.name}</h3>
              <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{selectedCustomer.company} · {selectedCustomer.country}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                <span className={`chip chip-${planTone(selectedCustomer.plan)}`}>{selectedCustomer.plan}</span>
                <span className="chip">
                  <span className="status-dot" style={{
                    background: selectedCustomer.status === 'Active' ? 'var(--mint-400)'
                              : selectedCustomer.status === 'Trial'  ? 'var(--butter-400)'
                              : 'var(--peach-400)'
                  }}/>
                  {selectedCustomer.status}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
                <button className="btn" style={{ flex: 1 }}><I.Mail size={14}/> Message</button>
                <button className="btn btn-primary" style={{ flex: 1 }}><I.External size={14}/> Open profile</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { label: 'MRR', value: `$${selectedCustomer.mrr.toLocaleString()}`, hint: 'monthly' },
                { label: 'LTV', value: `$${(selectedCustomer.mrr * 22).toLocaleString()}`, hint: 'projected' },
                { label: 'Seats', value: selectedCustomer.plan === 'Enterprise' ? '124' : selectedCustomer.plan === 'Scale' ? '38' : '7', hint: 'active' },
                { label: 'Joined', value: selectedCustomer.joined, hint: 'first signup' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.label}</div>
                  <div className="serif-num" style={{ fontSize: 22, marginTop: 2 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{s.hint}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div className="card-title">Engagement</div>
              <span className="chip chip-mint">Healthy</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Product usage', value: 84, color: 'var(--lilac-400)' },
                { label: 'Support sentiment', value: 71, color: 'var(--mint-400)' },
                { label: 'Feature adoption', value: 56, color: 'var(--peach-400)' },
                { label: 'Renewal likelihood', value: 92, color: 'var(--sky-400)' },
              ].map(s => (
                <div key={s.label}>
                  <div className="between" style={{ marginBottom: 6 }}>
                    <span style={{ fontSize: 12.5 }}>{s.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{s.value}%</span>
                  </div>
                  <div className="bar"><span style={{ width: `${s.value}%`, background: s.color }}/></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
