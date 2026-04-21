export const fmt = {
  money(v, opts = {}) {
    const n = Number(v) || 0;
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: opts.cents === false ? 0 : 2, maximumFractionDigits: 2 });
  },
  short(v) {
    const n = Number(v) || 0;
    if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
    if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
    return fmt.money(n, { cents: false });
  },
  number(v) { return (Number(v) || 0).toLocaleString('en-US'); },
  date(v, opts = {}) {
    if (!v) return '—';
    const d = new Date(v);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: opts.year ? 'numeric' : undefined });
  },
  dateTime(v) {
    if (!v) return '—';
    const d = new Date(v);
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  },
  ago(v) {
    if (!v) return '—';
    const ms = Date.now() - new Date(v).getTime();
    const min = Math.floor(ms / 60000);
    if (min < 1) return 'just now';
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const d = Math.floor(hr / 24);
    return `${d}d ago`;
  },
  pct(v) { return `${Math.round(Number(v) * 100)}%`; },
};

export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function delay(min = 250, max = 600) {
  const ms = min + Math.floor(Math.random() * (max - min));
  return new Promise((r) => setTimeout(r, ms));
}
