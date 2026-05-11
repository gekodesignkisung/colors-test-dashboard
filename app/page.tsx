'use client';

import React from 'react';
import { Sidebar, Topbar } from './components/Shell';
import { I } from './components/icons';
import OverviewPage from './components/pages/OverviewPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import CustomersPage from './components/pages/CustomersPage';
import RevenuePage from './components/pages/RevenuePage';
import SettingsPage from './components/pages/SettingsPage';
import PlaceholderPage from './components/pages/PlaceholderPage';

export default function Page() {
  const [route, setRoute] = React.useState('overview');
  const [query, setQuery] = React.useState('');

  return (
    <div className="app">
      <Sidebar route={route} setRoute={setRoute}/>
      <main className="main">
        <Topbar route={route} query={query} setQuery={setQuery}/>
        {route === 'overview'  && <OverviewPage/>}
        {route === 'analytics' && <AnalyticsPage/>}
        {route === 'customers' && <CustomersPage query={query}/>}
        {route === 'revenue'   && <RevenuePage/>}
        {route === 'settings'  && <SettingsPage/>}
        {route === 'products'  && <PlaceholderPage title="Products" sub="Manage your product catalog." icon={I.Box}/>}
        {route === 'campaigns' && <PlaceholderPage title="Campaigns" sub="Email and lifecycle campaigns." icon={I.Bolt}/>}
        {route === 'help'      && <PlaceholderPage title="Help center" sub="Guides, tutorials, and support." icon={I.Help}/>}
      </main>
    </div>
  );
}
