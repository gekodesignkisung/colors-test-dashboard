'use client';

import React from 'react';
import { I } from '../icons';

function SectionCard({ title, sub, children, action }: {
  title: string;
  sub?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">{title}</div>
          {sub && <div className="card-sub" style={{ marginTop: 4 }}>{sub}</div>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function AccountSection({ toggles, set }: { toggles: Record<string, unknown>; set: (k: string, v: unknown) => void }) {
  return (
    <>
      <SectionCard title="Profile" sub="This information is shown to your teammates.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
          <span className="avatar" style={{ width: 72, height: 72, fontSize: 26, background: 'var(--grad-iridescent)' }}>HK</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>Profile photo</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>PNG, JPG up to 2MB. Square images work best.</div>
          </div>
          <button className="btn">Upload</button>
          <button className="btn btn-ghost">Remove</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label className="field-label">Full name</label>
            <input className="input" defaultValue="Hyojin Kim"/>
          </div>
          <div>
            <label className="field-label">Display name</label>
            <input className="input" defaultValue="HK"/>
          </div>
          <div>
            <label className="field-label">Email</label>
            <input className="input" defaultValue="hyojin@pulse.io"/>
            <div className="field-hint">Used for sign-in and important notifications.</div>
          </div>
          <div>
            <label className="field-label">Role</label>
            <select className="select" defaultValue="Admin">
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label className="field-label">Bio</label>
            <textarea className="input" rows={3} defaultValue="Building beautiful analytics surfaces for SaaS teams. Tea drinker. Sometimes designs in Figma at 2am."/>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Workspace" sub="Settings shared by everyone in your workspace.">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label className="field-label">Workspace name</label>
            <input className="input" defaultValue="Pulse Analytics"/>
          </div>
          <div>
            <label className="field-label">Workspace URL</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <span style={{
                padding: '9px 12px', background: 'var(--surface-3)', border: '1px solid var(--border-strong)',
                borderRight: 'none', borderRadius: '10px 0 0 10px', fontSize: 13, color: 'var(--ink-3)'
              }}>pulse.io/</span>
              <input className="input" defaultValue="hyojin-team" style={{ borderRadius: '0 10px 10px 0' }}/>
            </div>
          </div>
          <div>
            <label className="field-label">Region</label>
            <select className="select" defaultValue="ap-northeast-2">
              <option value="us-east-1">US East (N. Virginia)</option>
              <option value="eu-west-1">EU West (Ireland)</option>
              <option value="ap-northeast-2">Asia Pacific (Seoul)</option>
            </select>
            <div className="field-hint">Data is stored in this region for compliance.</div>
          </div>
          <div>
            <label className="field-label">Language</label>
            <select className="select" defaultValue="en">
              <option value="en">English</option>
              <option value="ko">한국어</option>
              <option value="ja">日本語</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </SectionCard>

      <div className="card" style={{ background: 'var(--peach-50)', borderColor: 'var(--peach-200)' }}>
        <div className="between">
          <div>
            <div style={{ fontWeight: 600, color: 'var(--peach-600)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <I.Bell size={14}/> Danger zone
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 4 }}>
              Permanently delete this workspace and all associated data. This action cannot be undone.
            </div>
          </div>
          <button className="btn" style={{ background: 'white', color: 'var(--peach-600)', borderColor: 'var(--peach-200)' }}>
            Delete workspace
          </button>
        </div>
      </div>
    </>
  );
}

function NotifSection({ toggles, set }: { toggles: Record<string, unknown>; set: (k: string, v: unknown) => void }) {
  const rows = [
    { k: 'weekly', t: 'Weekly summary email', s: 'A roundup of your top metrics every Monday.' },
    { k: 'security', t: 'Security alerts', s: 'Get notified about new logins and access changes.' },
    { k: 'mentions', t: '@ mentions', s: 'When a teammate mentions you in a comment or chart.' },
    { k: 'billing', t: 'Billing updates', s: 'Invoices, receipts, and plan changes.' },
    { k: 'marketing', t: 'Product news', s: 'New features, release notes, and best practices.' },
  ];
  return (
    <SectionCard title="Notifications" sub="Choose which emails and push notifications you'd like to receive.">
      {rows.map(r => (
        <div key={r.k} className="setting-row">
          <div className="setting-info">
            <h4>{r.t}</h4>
            <p>{r.s}</p>
          </div>
          <div className="setting-ctrl">
            <button className={`toggle ${toggles[r.k] ? 'on' : ''}`} onClick={() => set(r.k, !toggles[r.k])}/>
          </div>
        </div>
      ))}
    </SectionCard>
  );
}

function SecuritySection({ toggles, set }: { toggles: Record<string, unknown>; set: (k: string, v: unknown) => void }) {
  return (
    <>
      <SectionCard title="Two-factor authentication" sub="Protect your account with an extra layer of security.">
        <div className="setting-row" style={{ borderBottom: 'none', padding: 0 }}>
          <div className="setting-info">
            <h4>Authenticator app</h4>
            <p>Use an app like 1Password or Authy to generate one-time codes.</p>
          </div>
          <div className="setting-ctrl" style={{ alignItems: 'center', gap: 10 }}>
            <span className="chip chip-mint">Enabled</span>
            <button className={`toggle ${toggles.twofactor ? 'on' : ''}`} onClick={() => set('twofactor', !toggles.twofactor)}/>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Active sessions" sub="Devices currently signed into your account."
        action={<button className="btn">Sign out all</button>}>
        {[
          { device: 'MacBook Pro 14"', loc: 'Seoul, KR', when: 'Active now', current: true, tone: 'mint' },
          { device: 'iPhone 16 Pro', loc: 'Seoul, KR', when: '2 hours ago', current: false, tone: 'sky' },
          { device: 'Chrome on Windows', loc: 'Tokyo, JP', when: '3 days ago', current: false, tone: 'butter' },
        ].map((s, i) => (
          <div key={i} className="setting-row">
            <div className="setting-info" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="kpi-icon" style={{ background: `var(--${s.tone}-100)` }}>
                <I.Globe size={16} style={{ color: `var(--${s.tone}-600)` }}/>
              </div>
              <div>
                <h4>{s.device} {s.current && <span className="chip chip-mint" style={{ marginLeft: 6 }}>This device</span>}</h4>
                <p>{s.loc} · {s.when}</p>
              </div>
            </div>
            <div className="setting-ctrl">
              {!s.current && <button className="btn btn-ghost">Revoke</button>}
            </div>
          </div>
        ))}
      </SectionCard>
    </>
  );
}

function AppearanceSection({ toggles, set }: { toggles: Record<string, unknown>; set: (k: string, v: unknown) => void }) {
  const themes = [
    { id: 'soft', label: 'Soft pastel', grad: 'var(--grad-card-hero)' },
    { id: 'mint', label: 'Mint breeze', grad: 'var(--grad-card-mint)' },
    { id: 'sky', label: 'Sky aurora', grad: 'var(--grad-card-sky)' },
    { id: 'butter', label: 'Honey glow', grad: 'var(--grad-card-butter)' },
  ];
  return (
    <SectionCard title="Appearance" sub="Customize how your workspace looks.">
      <div style={{ marginBottom: 20 }}>
        <label className="field-label">Theme</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {themes.map(t => (
            <button key={t.id}
                    onClick={() => set('theme', t.id)}
                    style={{
                      border: `2px solid ${toggles.theme === t.id ? 'var(--lilac-400)' : 'var(--border)'}`,
                      borderRadius: 14, padding: 4, background: 'white', cursor: 'pointer',
                      boxShadow: toggles.theme === t.id ? '0 0 0 4px var(--ring)' : 'none'
                    }}>
              <div style={{ height: 60, background: t.grad, borderRadius: 10, marginBottom: 6 }}/>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', padding: '4px 4px 6px' }}>{t.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="setting-row">
        <div className="setting-info">
          <h4>Density</h4>
          <p>Comfortable for spacious layouts, Compact to fit more content.</p>
        </div>
        <div className="setting-ctrl">
          <div className="seg">
            {['comfy', 'cozy', 'compact'].map(d => (
              <button key={d} className={toggles.density === d ? 'on' : ''} onClick={() => set('density', d)}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="setting-row">
        <div className="setting-info">
          <h4>Reduce motion</h4>
          <p>Minimize animations across the workspace.</p>
        </div>
        <div className="setting-ctrl">
          <button className={`toggle ${toggles.sessions ? 'on' : ''}`} onClick={() => set('sessions', !toggles.sessions)}/>
        </div>
      </div>
    </SectionCard>
  );
}

function TeamSection() {
  const members = [
    { name: 'Hyojin Kim', email: 'hyojin@pulse.io', role: 'Owner', avatar: 'HK', color: 'var(--lilac-400)' },
    { name: 'Sora Park', email: 'sora@pulse.io', role: 'Admin', avatar: 'SP', color: 'var(--peach-400)' },
    { name: 'Daniel Cho', email: 'daniel@pulse.io', role: 'Editor', avatar: 'DC', color: 'var(--mint-400)' },
    { name: 'Mina Lee', email: 'mina@pulse.io', role: 'Editor', avatar: 'ML', color: 'var(--sky-400)' },
    { name: 'Jiwon Han', email: 'jiwon@pulse.io', role: 'Viewer', avatar: 'JH', color: 'var(--butter-400)' },
  ];
  return (
    <SectionCard title="Team members" sub="People with access to this workspace."
                 action={<button className="btn btn-primary"><I.Plus size={14}/> Invite member</button>}>
      <table className="tbl" style={{ marginTop: -8 }}>
        <thead>
          <tr><th>Member</th><th>Role</th><th>Last active</th><th></th></tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.email}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="avatar" style={{ width: 30, height: 30, fontSize: 11, background: m.color }}>{m.avatar}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{m.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{m.email}</div>
                  </div>
                </div>
              </td>
              <td>
                <select className="select" defaultValue={m.role} style={{ width: 130, padding: '6px 10px', fontSize: 12.5 }}>
                  <option>Owner</option><option>Admin</option><option>Editor</option><option>Viewer</option>
                </select>
              </td>
              <td style={{ fontSize: 12, color: 'var(--ink-3)' }}>2 hours ago</td>
              <td><button className="btn btn-ghost"><I.Dots size={16}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

function BillingSection() {
  return (
    <>
      <div className="card" style={{ background: 'var(--grad-card-hero)' }}>
        <div className="between" style={{ alignItems: 'flex-start' }}>
          <div>
            <span className="chip chip-lilac">Current plan</span>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, margin: '10px 0 6px', letterSpacing: '-0.02em' }}>
              Scale workspace
            </div>
            <div style={{ color: 'var(--ink-2)', fontSize: 13.5, maxWidth: 460 }}>
              $1,900/mo · Up to 50 seats, unlimited workspaces, priority support. Renews Jun 14, 2026.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn">Manage seats</button>
            <button className="btn btn-primary">Upgrade plan</button>
          </div>
        </div>
      </div>
      <SectionCard title="Payment method" sub="Default card used for monthly invoices.">
        <div className="between" style={{ padding: 8, background: 'var(--surface-2)', borderRadius: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48, height: 32, background: 'linear-gradient(135deg, oklch(0.179 0.002 17.3), oklch(0.400 0.119 43.1))',
              borderRadius: 6, display: 'grid', placeItems: 'center', color: 'white',
              fontFamily: 'var(--font-num)', fontWeight: 700, fontSize: 13
            }}>VISA</div>
            <div>
              <div style={{ fontWeight: 600 }}>Visa ending in 4242</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Expires 09/2028 · Default</div>
            </div>
          </div>
          <button className="btn">Update</button>
        </div>
      </SectionCard>

      <SectionCard title="Recent invoices">
        <table className="tbl" style={{ marginTop: -8 }}>
          <thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {[
              { id: 'INV-3421', date: 'May 14, 2026', amt: 1900, status: 'Paid' },
              { id: 'INV-3387', date: 'Apr 14, 2026', amt: 1900, status: 'Paid' },
              { id: 'INV-3342', date: 'Mar 14, 2026', amt: 1900, status: 'Paid' },
              { id: 'INV-3298', date: 'Feb 14, 2026', amt: 1900, status: 'Paid' },
            ].map(inv => (
              <tr key={inv.id}>
                <td style={{ fontWeight: 600, fontFamily: 'var(--font-num)' }}>{inv.id}</td>
                <td style={{ color: 'var(--ink-3)' }}>{inv.date}</td>
                <td style={{ fontWeight: 600 }}>${inv.amt.toLocaleString()}</td>
                <td><span className="chip chip-mint">{inv.status}</span></td>
                <td><button className="btn btn-ghost"><I.Download size={14}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </>
  );
}

function IntegrationsSection() {
  const apps = [
    { name: 'Slack', desc: 'Send alerts and reports to Slack channels.', tone: 'butter', icon: '⌘', connected: true },
    { name: 'Linear', desc: 'Create tickets from customer feedback.', tone: 'lilac', icon: 'L', connected: true },
    { name: 'Stripe', desc: 'Sync subscription and revenue data.', tone: 'sky', icon: 'S', connected: true },
    { name: 'Notion', desc: 'Export charts and reports to Notion pages.', tone: 'peach', icon: 'N', connected: false },
    { name: 'HubSpot', desc: 'Sync customer profiles and lifecycle stages.', tone: 'rose', icon: 'H', connected: false },
    { name: 'Zapier', desc: 'Trigger 6,000+ workflows from any event.', tone: 'mint', icon: 'Z', connected: false },
  ];
  return (
    <SectionCard title="Integrations" sub="Connect Pulse to your favorite tools.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {apps.map(a => (
          <div key={a.name} style={{
            border: '1px solid var(--border)', borderRadius: 12, padding: 14,
            display: 'flex', gap: 12, alignItems: 'flex-start'
          }}>
            <div className="kpi-icon" style={{
              width: 40, height: 40, background: `var(--${a.tone}-100)`,
              color: `var(--${a.tone}-600)`, fontWeight: 700, fontSize: 18,
              fontFamily: 'var(--font-num)'
            }}>{a.icon}</div>
            <div style={{ flex: 1 }}>
              <div className="between">
                <div style={{ fontWeight: 600 }}>{a.name}</div>
                {a.connected ? <span className="chip chip-mint">Connected</span>
                             : <button className="btn" style={{ padding: '4px 10px', fontSize: 12 }}>Connect</button>}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 4 }}>{a.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function ApiSection() {
  return (
    <SectionCard title="API keys" sub="Create and rotate keys for your applications."
                 action={<button className="btn btn-primary"><I.Plus size={14}/> New key</button>}>
      <table className="tbl" style={{ marginTop: -8 }}>
        <thead><tr><th>Name</th><th>Key</th><th>Created</th><th>Last used</th><th></th></tr></thead>
        <tbody>
          {[
            { name: 'Production', key: 'sk_live_••••••••a3F2', created: 'Jan 12, 2026', used: '3m ago' },
            { name: 'Staging', key: 'sk_test_••••••••9bX1', created: 'Mar 04, 2026', used: '2 days ago' },
            { name: 'CI / CD', key: 'sk_ci_••••••••2pQ4', created: 'Apr 22, 2026', used: '14 minutes ago' },
          ].map(k => (
            <tr key={k.name}>
              <td style={{ fontWeight: 600 }}>{k.name}</td>
              <td style={{ fontFamily: 'var(--font-num)', fontSize: 12 }}>{k.key}</td>
              <td style={{ color: 'var(--ink-3)' }}>{k.created}</td>
              <td style={{ color: 'var(--ink-3)' }}>{k.used}</td>
              <td><button className="btn btn-ghost"><I.Dots size={16}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

export default function SettingsPage() {
  const [section, setSection] = React.useState('account');
  const [toggles, setToggles] = React.useState<Record<string, unknown>>({
    weekly: true, security: true, marketing: false, mentions: true, billing: true,
    twofactor: true, sessions: false, theme: 'soft', density: 'comfy',
  });
  const set = (k: string, v: unknown) => setToggles(p => ({ ...p, [k]: v }));

  const sections = [
    { key: 'account',  label: 'Account',         icon: I.Users },
    { key: 'team',     label: 'Team & roles',    icon: I.Shield },
    { key: 'billing',  label: 'Billing',         icon: I.Card },
    { key: 'notifications', label: 'Notifications', icon: I.Bell },
    { key: 'security', label: 'Security',        icon: I.Lock },
    { key: 'appearance', label: 'Appearance',    icon: I.Image },
    { key: 'integrations', label: 'Integrations',icon: I.Layers },
    { key: 'api',      label: 'API & webhooks',  icon: I.Globe },
  ];

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <h1>Workspace <em>settings</em></h1>
          <div className="sub">Manage your workspace, team, billing, and integrations.</div>
        </div>
        <div className="head-actions">
          <button className="btn">Discard</button>
          <button className="btn btn-primary"><I.Check size={14}/> Save changes</button>
        </div>
      </div>

      <div className="grid-12">
        <div className="card col-3" style={{ padding: 10, height: 'fit-content', position: 'sticky', top: 80 }}>
          <div className="settings-nav">
            {sections.map(s => {
              const Ic = s.icon;
              return (
                <div key={s.key}
                     className={`nav-item ${section === s.key ? 'active' : ''}`}
                     onClick={() => setSection(s.key)}>
                  <Ic className="nav-icon" size={16}/>
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-9" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {section === 'account' && <AccountSection toggles={toggles} set={set}/>}
          {section === 'team' && <TeamSection/>}
          {section === 'billing' && <BillingSection/>}
          {section === 'notifications' && <NotifSection toggles={toggles} set={set}/>}
          {section === 'security' && <SecuritySection toggles={toggles} set={set}/>}
          {section === 'appearance' && <AppearanceSection toggles={toggles} set={set}/>}
          {section === 'integrations' && <IntegrationsSection/>}
          {section === 'api' && <ApiSection/>}
        </div>
      </div>
    </div>
  );
}
