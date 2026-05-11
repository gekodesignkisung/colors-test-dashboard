'use client';

import React from 'react';
import { I } from '../icons';

export default function PlaceholderPage({ title, sub, icon: Ic = I.Sparkle }: {
  title: string;
  sub: string;
  icon?: (p: { size?: number; style?: React.CSSProperties }) => React.ReactNode;
}) {
  return (
    <div className="content">
      <div className="page-head">
        <div>
          <h1>{title}</h1>
          <div className="sub">{sub}</div>
        </div>
      </div>
      <div className="card" style={{
        padding: 60, textAlign: 'center', background: 'var(--grad-card-hero)', border: 'none'
      }}>
        <div className="kpi-icon" style={{
          width: 60, height: 60, margin: '0 auto 16px',
          background: 'white'
        }}>
          <Ic size={26} style={{ color: 'var(--lilac-600)' }}/>
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 24,
          marginBottom: 8
        }}>Coming soon</div>
        <div style={{ color: 'var(--ink-2)', maxWidth: 420, margin: '0 auto', fontSize: 14 }}>
          This section is part of the reference design system. Use the sidebar to navigate to Overview, Analytics, Customers, Revenue, or Settings for fully realized examples.
        </div>
      </div>
    </div>
  );
}
