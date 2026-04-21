import { D } from '../../tokens.js';
import { AdminShell } from '../../components/layout/AdminShell.jsx';
import { AdminCard, Sparkline } from '../../components/layout/AdminCard.jsx';
import { Icon } from '../../components/shared/Icon.jsx';
import { PRODUCTS } from '../../data/index.js';

export function AdminAnalytics() {
  return (
    <AdminShell active="analytics">
      <div style={{ padding: '40px 40px 64px' }}>
        <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 12 }}>ANALYTICS · REVENUE & PERFORMANCE</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 28 }}>
          <h1 style={{ fontFamily: D.display, fontSize: 56, fontWeight: 400, letterSpacing: -1.3, lineHeight: 1, margin: 0 }}>Analytics.</h1>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.ink3 }}>LAST SYNC · 04 MIN AGO</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, marginBottom: 14 }}>
          <AdminCard title="Revenue · actual vs target · FY26">
            <Sparkline points={[42,48,51,47,53,58,62,59,64,68,72,69,75,78,74,80,85,82,88,92,89,94,97,93,99,102,98,105,110,114]} tall />
            <div style={{ display: 'flex', gap: 20, marginTop: 18, fontSize: 12, color: D.ink2 }}>
              <span><Icon.dot style={{ color: D.plum }} /> Actual · $14.2M</span>
              <span><Icon.dot style={{ color: D.ink3 }} /> Target · $12.8M</span>
              <span style={{ color: '#3b8760' }}>+10.9% over plan</span>
            </div>
          </AdminCard>
          <AdminCard title="By category">
            <div style={{ display: 'grid', gap: 10 }}>
              {[['Orthotics', '$4.82M', 42], ['PPE', '$3.12M', 28], ['Diagnostics', '$2.41M', 20], ['Wound Care', '$1.28M', 14], ['Equipment', '$0.92M', 8], ['Pharma', '$0.64M', 6]].map(([n, v, w], i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span>{n}</span><span style={{ fontFamily: D.display, color: D.plum }}>{v}</span>
                  </div>
                  <div style={{ height: 6, background: D.paperAlt, borderRadius: 3, marginTop: 6 }}>
                    <div style={{ height: 6, background: D.plum, borderRadius: 3, width: `${w * 2}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          <AdminCard title="Top SKUs · 90 days">
            {PRODUCTS.slice(0, 6).map((p, i) => (
              <div key={p.sku} style={{ padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${D.line}`, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name.split('·')[0].trim()}</div>
                  <div style={{ fontSize: 11, color: D.ink3, fontFamily: D.mono }}>{p.sku}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: D.display, fontSize: 16, color: D.plum }}>${(80000 + i * 22000).toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: '#3b8760', fontFamily: D.mono }}>+{18 + i * 6}%</div>
                </div>
              </div>
            ))}
          </AdminCard>
          <AdminCard title="Weekly orders · placed vs shipped">
            <div style={{ display: 'flex', alignItems: 'end', gap: 6, height: 180, marginTop: 12 }}>
              {[60, 72, 68, 85, 79, 92, 88, 96, 84, 91, 102, 98].map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ background: D.plum, height: `${v * 1.3}px`, borderRadius: 2 }} />
                  <div style={{ background: D.plumSoft, height: `${v * 1.1}px`, borderRadius: 2 }} />
                </div>
              ))}
            </div>
            <div style={{ fontFamily: D.mono, fontSize: 10, color: D.ink3, letterSpacing: 1, marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
              <span>WK-12</span><span>WK-24</span>
            </div>
          </AdminCard>
          <AdminCard title="Customer segments · share of wallet">
            {[['Ambulatory surgery', '44%', D.plum], ['Gov/VA', '24%', D.terra], ['Pharmacy', '21%', '#3b8760'], ['Regional dealers', '11%', D.ink3]].map(([n, p, c], i) => (
              <div key={i} style={{ padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${D.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: c }} />
                <div style={{ flex: 1, fontSize: 13 }}>{n}</div>
                <div style={{ fontFamily: D.display, fontSize: 18, color: D.plum }}>{p}</div>
              </div>
            ))}
          </AdminCard>
        </div>
      </div>
    </AdminShell>
  );
}
