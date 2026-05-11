// ============================================
// Mock data for the dashboard
// ============================================

const _today = new Date('2026-05-11');
const _days = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(_today);
  d.setDate(d.getDate() - (29 - i));
  return d;
});

const _seed = (n: number) => {
  let s = n;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};
const rnd = _seed(42);

export interface DataPoint {
  date: Date;
  value: number;
  label: string;
}

export const revenueSeries: DataPoint[] = _days.map((d, i) => {
  const base = 14000 + i * 480;
  const noise = (rnd() - 0.4) * 4200;
  const v = Math.max(8000, Math.round(base + noise + Math.sin(i / 3.4) * 2400));
  return { date: d, value: v, label: `${d.getMonth() + 1}/${d.getDate()}` };
});

export const signupSeries: DataPoint[] = _days.map((d, i) => {
  const base = 240 + i * 6.5;
  const noise = (rnd() - 0.4) * 80;
  const v = Math.max(140, Math.round(base + noise + Math.cos(i / 4) * 40));
  return { date: d, value: v, label: `${d.getMonth() + 1}/${d.getDate()}` };
});

export const churnSeries: DataPoint[] = _days.map((d, i) => {
  const v = Math.max(0.8, 3.2 - i * 0.045 + (rnd() - 0.5) * 0.6);
  return { date: d, value: +v.toFixed(2), label: `${d.getMonth() + 1}/${d.getDate()}` };
});

export interface GeoEntry {
  name: string;
  code: string;
  value: number;
  share: number;
  trend: string;
  delta: number;
  color: string;
}

export const geoData: GeoEntry[] = [
  { name: 'United States', code: 'US', value: 38420, share: 32.4, trend: 'up', delta: 12.4, color: 'var(--lilac-400)' },
  { name: 'Germany',       code: 'DE', value: 18230, share: 15.4, trend: 'up', delta: 8.7,  color: 'var(--peach-400)' },
  { name: 'Japan',         code: 'JP', value: 14108, share: 11.9, trend: 'up', delta: 4.1,  color: 'var(--mint-400)' },
  { name: 'United Kingdom',code: 'GB', value: 11540, share: 9.7,  trend: 'down', delta: -2.3,color: 'var(--sky-400)' },
  { name: 'Canada',        code: 'CA', value:  9820, share: 8.3,  trend: 'up', delta: 5.6,  color: 'var(--butter-400)' },
  { name: 'France',        code: 'FR', value:  7440, share: 6.3,  trend: 'up', delta: 3.2,  color: 'var(--rose-400)' },
  { name: 'Brazil',        code: 'BR', value:  6850, share: 5.8,  trend: 'up', delta: 14.8, color: 'oklch(0.481 0.111 240.7)' },
  { name: 'Australia',     code: 'AU', value:  4810, share: 4.1,  trend: 'down', delta: -1.1,color: 'oklch(0.549 0.137 19.9)' },
];

export interface SourceEntry {
  name: string;
  value: number;
  color: string;
}

export const sourceData: SourceEntry[] = [
  { name: 'Organic search', value: 42, color: 'var(--lilac-400)' },
  { name: 'Direct',         value: 23, color: 'var(--peach-400)' },
  { name: 'Referral',       value: 16, color: 'var(--mint-400)' },
  { name: 'Social',         value: 12, color: 'var(--sky-400)' },
  { name: 'Email',          value: 7,  color: 'var(--butter-400)' },
];

export interface PlanEntry {
  name: string;
  users: number;
  revenue: number;
  color: string;
}

export const planData: PlanEntry[] = [
  { name: 'Starter',    users: 4218, revenue: 21090, color: 'var(--sky-400)' },
  { name: 'Growth',     users: 2104, revenue: 84160, color: 'var(--lilac-400)' },
  { name: 'Scale',      users:  618, revenue:123600, color: 'var(--peach-400)' },
  { name: 'Enterprise', users:   84, revenue: 84000, color: 'var(--mint-400)' },
];

export interface Customer {
  id: number;
  name: string;
  email: string;
  company: string;
  plan: string;
  mrr: number;
  status: string;
  country: string;
  joined: string;
  avatar: string;
  color: string;
}

export const customers: Customer[] = [
  { id: 1, name: 'Avery Quintero', email: 'avery@northwind.co',  company: 'Northwind Labs',   plan: 'Enterprise', mrr: 4200, status: 'Active',   country: 'US', joined: '2024-08-12', avatar: 'AQ', color: 'var(--lilac-400)' },
  { id: 2, name: 'Mei Tanaka',     email: 'mei@kioko.jp',        company: 'Kioko Studio',     plan: 'Scale',      mrr: 1900, status: 'Active',   country: 'JP', joined: '2025-01-04', avatar: 'MT', color: 'var(--peach-400)' },
  { id: 3, name: 'Lukas Brandt',   email: 'lukas@blockheim.de',  company: 'Blockheim',        plan: 'Growth',     mrr:  490, status: 'Trial',    country: 'DE', joined: '2026-04-21', avatar: 'LB', color: 'var(--mint-400)' },
  { id: 4, name: 'Priya Nair',     email: 'priya@sundial.io',    company: 'Sundial',          plan: 'Growth',     mrr:  490, status: 'Active',   country: 'GB', joined: '2025-09-30', avatar: 'PN', color: 'var(--sky-400)' },
  { id: 5, name: 'Sebastian Roux', email: 's.roux@brume.fr',     company: 'Brume',            plan: 'Scale',      mrr: 1900, status: 'Active',   country: 'FR', joined: '2025-06-17', avatar: 'SR', color: 'var(--butter-400)' },
  { id: 6, name: 'Camila Vega',    email: 'camila@playa.br',     company: 'Playa Digital',    plan: 'Starter',    mrr:   29, status: 'Trial',    country: 'BR', joined: '2026-05-02', avatar: 'CV', color: 'var(--rose-400)' },
  { id: 7, name: 'Owen MacAllister',email:'owen@harbor.ca',      company: 'Harbor Goods',     plan: 'Growth',     mrr:  490, status: 'Active',   country: 'CA', joined: '2025-03-22', avatar: 'OM', color: 'var(--lilac-400)' },
  { id: 8, name: 'Yuki Hara',      email: 'yuki@bento.jp',       company: 'Bento Co.',        plan: 'Enterprise', mrr: 4200, status: 'Active',   country: 'JP', joined: '2024-11-08', avatar: 'YH', color: 'var(--peach-400)' },
  { id: 9, name: 'Hugo Bernardi',  email: 'hugo@palmero.it',     company: 'Palmero',          plan: 'Starter',    mrr:   29, status: 'Churned',  country: 'IT', joined: '2024-12-19', avatar: 'HB', color: 'var(--mint-400)' },
  { id:10, name: 'Naomi Aoki',     email: 'naomi@meadow.au',     company: 'Meadow & Pine',    plan: 'Growth',     mrr:  490, status: 'Active',   country: 'AU', joined: '2025-07-11', avatar: 'NA', color: 'var(--sky-400)' },
  { id:11, name: 'Felix Wenger',   email: 'felix@kantine.ch',    company: 'Kantine',          plan: 'Scale',      mrr: 1900, status: 'Active',   country: 'CH', joined: '2025-10-04', avatar: 'FW', color: 'var(--butter-400)' },
  { id:12, name: 'Aiyana Mendez',  email: 'aiyana@sol.mx',       company: 'Sol Studio',       plan: 'Growth',     mrr:  490, status: 'Active',   country: 'MX', joined: '2026-02-14', avatar: 'AM', color: 'var(--rose-400)' },
];

export interface ActivityEntry {
  type: string;
  who: string;
  what: string;
  time: string;
  tone: string;
}

export const activityFeed: ActivityEntry[] = [
  { type: 'signup', who: 'Lucia Marín', what: 'subscribed to the Growth plan', time: '3m ago', tone: 'mint' },
  { type: 'invoice', who: 'Northwind Labs', what: 'paid invoice #INV-3421 of $4,200', time: '24m ago', tone: 'lilac' },
  { type: 'flag', who: 'Sundial', what: 'flagged a billing issue', time: '1h ago', tone: 'peach' },
  { type: 'upgrade', who: 'Kioko Studio', what: 'upgraded from Growth → Scale', time: '2h ago', tone: 'sky' },
  { type: 'churn', who: 'Palmero', what: 'cancelled their subscription', time: '4h ago', tone: 'rose' },
  { type: 'feature', who: 'Bento Co.', what: 'enabled 4 new feature flags', time: '6h ago', tone: 'butter' },
];

export interface TopPage {
  path: string;
  visits: number;
  change: number;
  avgTime: string;
}

export const topPages: TopPage[] = [
  { path: '/',                visits: 142890, change: 12.3, avgTime: '2m 14s' },
  { path: '/pricing',         visits:  84210, change:  8.4, avgTime: '1m 48s' },
  { path: '/changelog',       visits:  62180, change: 24.6, avgTime: '3m 02s' },
  { path: '/blog/launch-v2',  visits:  41040, change: 42.1, avgTime: '4m 38s' },
  { path: '/docs/quickstart', visits:  38720, change: -3.2, avgTime: '2m 51s' },
  { path: '/customers',       visits:  21080, change: 11.0, avgTime: '1m 22s' },
];

// Feature usage heatmap (7x12 = days × 2-hour buckets)
const rnd2 = _seed(42);
export const heatmapData: number[][] = Array.from({ length: 7 }, (_, r) =>
  Array.from({ length: 12 }, (_, c) => {
    const wave = Math.sin((r + c) / 2.6) * 0.4 + 0.5;
    return Math.max(0.05, Math.min(1, wave + (rnd2() - 0.5) * 0.5));
  })
);
