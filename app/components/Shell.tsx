'use client';

import React from 'react';
import { I } from './icons';

interface SidebarProps {
  route: string;
  setRoute: (r: string) => void;
}

export function Sidebar({ route, setRoute }: SidebarProps) {
  const items = [
    { key: 'overview',  label: 'Overview',   icon: I.Home, group: 'Workspace' },
    { key: 'analytics', label: 'Analytics',  icon: I.Chart, group: 'Workspace' },
    { key: 'customers', label: 'Customers',  icon: I.Users, group: 'Workspace', badge: '12' },
    { key: 'revenue',   label: 'Revenue',    icon: I.Wallet, group: 'Workspace' },
    { key: 'products',  label: 'Products',   icon: I.Box, group: 'Workspace' },
    { key: 'campaigns', label: 'Campaigns',  icon: I.Bolt, group: 'Workspace' },
    { key: 'settings',  label: 'Settings',   icon: I.Settings, group: 'Account' },
    { key: 'help',      label: 'Help center',icon: I.Help, group: 'Account' },
  ];
  const groups = [...new Set(items.map(i => i.group))];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-name">Pulse</div>
      </div>

      {groups.map(g => (
        <React.Fragment key={g}>
          <div className="nav-group-label">{g}</div>
          {items.filter(i => i.group === g).map(item => {
            const Icn = item.icon;
            return (
              <div key={item.key}
                   className={`nav-item ${route === item.key ? 'active' : ''}`}
                   onClick={() => setRoute(item.key)}>
                <Icn className="nav-icon" size={18}/>
                <span>{item.label}</span>
                {item.badge && <span className="badge">{item.badge}</span>}
              </div>
            );
          })}
        </React.Fragment>
      ))}

      <div className="sidebar-card">
        <h4>Try AI Insights</h4>
        <p>Get auto-generated weekly reports on your top metrics.</p>
        <button>
          <I.Sparkle size={13}/> Enable preview
        </button>
      </div>
    </aside>
  );
}

interface TopbarProps {
  route: string;
  query: string;
  setQuery: (q: string) => void;
}

export function Topbar({ route, query, setQuery }: TopbarProps) {
  const titles: Record<string, string> = {
    overview: 'Overview',
    analytics: 'Analytics',
    customers: 'Customers',
    revenue: 'Revenue',
    products: 'Products',
    campaigns: 'Campaigns',
    settings: 'Settings',
    help: 'Help center'
  };
  return (
    <div className="topbar">
      <div className="crumbs">
        <span>Workspace</span>
        <I.ChevronRight size={14}/>
        <strong>{titles[route] || route}</strong>
      </div>
      <div className="search">
        <I.Search size={15}/>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search metrics, customers, docs…"/>
        <span className="kbd">⌘K</span>
      </div>
      <button className="icon-btn" title="Refresh"><I.Refresh size={16}/></button>
      <button className="icon-btn" title="Notifications"><I.Bell size={16}/><span className="dot"/></button>
      <div className="avatar" title="Hyojin Kim">HK</div>
    </div>
  );
}
