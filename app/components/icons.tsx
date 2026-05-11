'use client';

import React from 'react';

interface IconBaseProps {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Icon({ d, size = 16, sw = 1.7, fill = "none", style, className }: { d: any; sw?: number; fill?: string } & IconBaseProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} stroke="currentColor"
         strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      {typeof d === 'string' ? <path d={d} /> : d}
    </svg>
  );
}

type IconProps = IconBaseProps;

export const I = {
  Home:     (p: IconProps) => <Icon {...p} d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V10.5Z" />,
  Chart:    (p: IconProps) => <Icon {...p} d={<><path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 5-6"/></>} />,
  Users:    (p: IconProps) => <Icon {...p} d={<><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 11a3 3 0 1 0 0-6"/><path d="M22 20a5 5 0 0 0-3-4.6"/></>} />,
  Wallet:   (p: IconProps) => <Icon {...p} d={<><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/><circle cx="16" cy="14" r="1.3" fill="currentColor"/></>} />,
  Box:      (p: IconProps) => <Icon {...p} d={<><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/></>} />,
  Bolt:     (p: IconProps) => <Icon {...p} d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  Settings: (p: IconProps) => <Icon {...p} d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></>} />,
  Bell:     (p: IconProps) => <Icon {...p} d={<><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>} />,
  Search:   (p: IconProps) => <Icon {...p} d={<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>} />,
  ChevronDown: (p: IconProps) => <Icon {...p} d="m6 9 6 6 6-6" />,
  ChevronRight:(p: IconProps) => <Icon {...p} d="m9 6 6 6-6 6" />,
  Plus:     (p: IconProps) => <Icon {...p} d="M12 5v14M5 12h14" />,
  ArrowUp:  (p: IconProps) => <Icon {...p} d="M12 19V5M5 12l7-7 7 7" />,
  ArrowDown:(p: IconProps) => <Icon {...p} d="M12 5v14M19 12l-7 7-7-7" />,
  Calendar: (p: IconProps) => <Icon {...p} d={<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>} />,
  Download: (p: IconProps) => <Icon {...p} d={<><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></>} />,
  Filter:   (p: IconProps) => <Icon {...p} d="M3 5h18l-7 9v6l-4-2v-4L3 5Z" />,
  Sparkle:  (p: IconProps) => <Icon {...p} d={<><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></>} />,
  Globe:    (p: IconProps) => <Icon {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>} />,
  Star:     (p: IconProps) => <Icon {...p} d="m12 2 3 7 7 .6-5.3 4.6L18 21l-6-3.6L6 21l1.3-6.8L2 9.6 9 9l3-7Z" />,
  Mail:     (p: IconProps) => <Icon {...p} d={<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></>} />,
  Heart:    (p: IconProps) => <Icon {...p} d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" />,
  Eye:      (p: IconProps) => <Icon {...p} d={<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>} />,
  Logout:   (p: IconProps) => <Icon {...p} d={<><path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></>} />,
  Check:    (p: IconProps) => <Icon {...p} d="M5 12l5 5L20 7" />,
  X:        (p: IconProps) => <Icon {...p} d="M6 6l12 12M18 6 6 18" />,
  Dots:     (p: IconProps) => <Icon {...p} d={<><circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/></>} />,
  External: (p: IconProps) => <Icon {...p} d={<><path d="M14 3h7v7"/><path d="M21 3 10 14"/><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6"/></>} />,
  Image:    (p: IconProps) => <Icon {...p} d={<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></>} />,
  Tag:      (p: IconProps) => <Icon {...p} d={<><path d="M3 3h8l10 10-8 8L3 11V3Z"/><circle cx="7.5" cy="7.5" r="1.3"/></>} />,
  Zap:      (p: IconProps) => <Icon {...p} d="M13 2 3 14h7l-1 8 11-13h-7l0-7Z" />,
  Pulse:    (p: IconProps) => <Icon {...p} d="M3 12h4l3-9 4 18 3-9h4" />,
  Layers:   (p: IconProps) => <Icon {...p} d={<><path d="m12 2 10 6-10 6L2 8l10-6Z"/><path d="m2 14 10 6 10-6M2 11l10 6 10-6"/></>} />,
  Help:     (p: IconProps) => <Icon {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 17h.01"/></>} />,
  ChartBar: (p: IconProps) => <Icon {...p} d={<><rect x="4" y="11" width="3" height="9" rx="1"/><rect x="10.5" y="6" width="3" height="14" rx="1"/><rect x="17" y="14" width="3" height="6" rx="1"/></>} />,
  Refresh:  (p: IconProps) => <Icon {...p} d={<><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></>} />,
  Lock:     (p: IconProps) => <Icon {...p} d={<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/></>} />,
  Card:     (p: IconProps) => <Icon {...p} d={<><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 10h20M6 15h3"/></>} />,
  Shield:   (p: IconProps) => <Icon {...p} d={<><path d="M12 3 4 6v6c0 4.5 3.4 8.5 8 9 4.6-.5 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></>} />,
};
